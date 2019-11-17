import { ButtonProps } from '../Button/Button';

export interface ModalProps {
  title: string;
  onClose?: () => void;
  onSuccess?: (newPlayerId: number) => void;
  footerButtons?: (ButtonProps & { text: string })[];
  center?: boolean;
  className?: string;
}
