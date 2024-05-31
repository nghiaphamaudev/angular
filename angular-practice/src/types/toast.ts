export interface Toast {
  icon: string;
  message: string;
}

export interface DetailToast {
  timer: number;
  success: Toast;
  error: Toast;
}
