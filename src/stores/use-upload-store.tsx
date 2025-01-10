/* eslint-disable */
import { create } from "zustand";
import axios from "axios";

// Types
interface FileUpload {
  file: File;
  description: string;
  progress: number;
  status: "initial" | "uploading" | "retrying" | "done" | "error";
  errorMessage?: string;
  retryCount: number;
}

interface UploadStore {
  // State
  files: FileUpload[];
  uploading: boolean;
  cropFile: FileUpload | null;

  // Derived state
  pendingFilesCount: () => number;

  // Actions
  addFiles: (newFiles: File[]) => void;
  removeFile: (file: FileUpload) => void;
  updateFile: (
    fileToUpdate: FileUpload,
    attributes: Partial<FileUpload>,
  ) => void;
  startUpload: () => void;
  setCropFile: (file: FileUpload | null) => void;
  handleCropComplete: (file: FileUpload, croppedFile: File) => void;
  clearFiles: () => void;
}

// Configuration
const CONFIG = {
  MAX_FILE_SIZE: 5, // 5MB
  MAX_CONCURRENT_UPLOAD_LIMIT: 1,
  MAX_RETRY_LIMIT: 3,
  ALLOWED_TYPES: ["image/webp", "image/png", "image/jpeg", "image/svg+xml"],
  URL: `/auth/image/upload`,
  TIMEOUT_DURATION: 60, // 1 minute
};

// File validation helpers
const isValidFileSize = (file: File): boolean => {
  const MB = 1024 * 1024;
  return file.size <= CONFIG.MAX_FILE_SIZE * MB;
};

const isValidFileType = (file: File): boolean => {
  return CONFIG.ALLOWED_TYPES.includes(file.type);
};

export const useUploadStore = create<UploadStore>((set, get) => ({
  files: [],
  uploading: false,
  cropFile: null,

  // Derived state
  pendingFilesCount: () =>
    get().files.filter((file) => file.status !== "done").length,

  // Actions
  addFiles: (newFiles) => {
    const validFiles = newFiles
      .filter((file) => {
        if (!isValidFileType(file)) {
          console.log("Invalid file type. Allowed types: WEBP, PNG, JPEG, SVG");
          return false;
        }
        if (!isValidFileSize(file)) {
          console.log(
            `File size exceeds maximum limit of ${CONFIG.MAX_FILE_SIZE}MB`,
          );
          return false;
        }
        return true;
      })
      .map(
        (file): FileUpload => ({
          file,
          status: "initial",
          retryCount: 0,
          progress: 0,
          errorMessage: "",
          description: file.name.split(".").slice(0, -1).join("."),
        }),
      );

    set((state) => ({
      files: [
        ...state.files.filter((file) => file.status !== "done"),
        ...validFiles,
      ],
    }));
  },

  removeFile: (fileToRemove) => {
    set((state) => ({
      files: state.files.filter((file) => file !== fileToRemove),
    }));
  },

  updateFile: (fileToUpdate, attributes) => {
    set((state) => ({
      files: state.files.map((file) =>
        file.file === fileToUpdate.file ? { ...file, ...attributes } : file,
      ),
    }));
  },

  setCropFile: (file) => {
    set({ cropFile: file });
  },

  handleCropComplete: (file, croppedFile) => {
    const updatedFile: FileUpload = {
      ...file,
      file: croppedFile,
    };

    set((state) => ({
      files: [
        ...state.files.filter((f) => f.file.name !== file.file.name),
        updatedFile,
      ],
      cropFile: null,
    }));
  },

  clearFiles: () => {
    set({ files: [] });
  },

  startUpload: async () => {
    const { files, updateFile } = get();
    set({ uploading: true });

    const uploadSingleFile = async (file: FileUpload) => {
      try {
        if (file.retryCount >= CONFIG.MAX_RETRY_LIMIT || file.status === "done")
          return;

        if (!isValidFileSize(file.file)) {
          set((state) => ({
            files: state.files.filter((f) => f !== file),
          }));
          return;
        }

        const formData = new FormData();
        formData.append("file", file.file);
        formData.append(
          "data",
          JSON.stringify({
            description: file.description,
          }),
        );

        updateFile(file, {
          status: file.retryCount > 0 ? "retrying" : "uploading",
          progress: 0,
        });

        const response = await axios.post(CONFIG.URL, formData, {
          timeout: CONFIG.TIMEOUT_DURATION * 1000,
          withCredentials: true,
          headers: { "Content-Type": "multipart/form-data" },
          onUploadProgress: (progressEvent: any) => {
            const progress = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total,
            );
            updateFile(file, { progress });
          },
        });

        if (response.status === 200) {
          updateFile(file, { status: "done", progress: 100 });
        }
      } catch (error: any) {
        const errorMessage = getErrorMessage(error);
        updateFile(file, {
          status: "error",
          errorMessage: errorMessage,
          retryCount: file.retryCount + 1,
          progress: 0,
        });
      }
    };

    // Process uploads in chunks
    const chunkedFiles = [];
    for (let i = 0; i < files.length; i += CONFIG.MAX_CONCURRENT_UPLOAD_LIMIT) {
      chunkedFiles.push(files.slice(i, i + CONFIG.MAX_CONCURRENT_UPLOAD_LIMIT));
    }

    for (const chunk of chunkedFiles) {
      await Promise.all(chunk.map(uploadSingleFile));
    }

    set({ uploading: false });
  },
}));

// Error handling helper
const getErrorMessage = (error: any): string => {
  if (error.response) {
    switch (error.response.status) {
      case 401:
        return "Unauthorized access. Please login again.";
      case 413:
        return "File is too large. Please upload a smaller file.";
      default:
        return "Upload failed due to a network error. Check your connection.";
    }
  }
  return error.code === "ECONNABORTED"
    ? "Upload timed out. Please try again."
    : "Upload failed due to a network error. Check your connection.";
};
