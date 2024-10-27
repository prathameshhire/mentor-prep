import * as Dialog from "@radix-ui/react-dialog";
import IonIcon from "@reacticons/ionicons";
import { ReactNode } from "react";

export interface ModalProps extends Dialog.DialogProps {
  title?: string;
  description?: string;
  trigger?: ReactNode;
  triggerProps?: Dialog.DialogTriggerProps;
  portalProps?: Dialog.DialogPortalProps;
  overlayProps?: Dialog.DialogOverlayProps;
  contentProps?: Dialog.DialogContentProps;
  titleProps?: Dialog.DialogTitleProps;
  descriptionProps?: Dialog.DialogDescriptionProps;
  closeProps?: Dialog.DialogCloseProps;
  canClose?: boolean;
}

const Modal = ({
  title,
  description,
  trigger,
  triggerProps,
  portalProps,
  overlayProps,
  contentProps,
  titleProps,
  descriptionProps,
  closeProps,
  canClose = false,
  children,
  ...props
}: ModalProps) => (
  <Dialog.Root {...props}>
    {trigger && (
      <Dialog.Trigger asChild {...triggerProps}>
        {trigger}
      </Dialog.Trigger>
    )}
    <Dialog.Portal {...portalProps}>
      <Dialog.Overlay
        className="bg-modal-bg z-50 data-[state=open]:animate-instructionOverlayShow fixed inset-0"
        {...overlayProps}
      />
      <Dialog.Content
        className="data-[state=open]:animate-instructionContentShow z-50 fixed left-[50%] top-[50%] max-h-[85vh] w-fit max-w-[90vw] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-white p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none"
        {...contentProps}
      >
        {title && (
          <Dialog.Title
            className="text-mauve12  m-0 text-[17px] font-medium"
            {...titleProps}
          >
            {title}
          </Dialog.Title>
        )}
        {description && (
          <Dialog.Description
            className="text-mauve11 mb-5 mt-[10px] text-[15px] leading-normal"
            {...descriptionProps}
          >
            {description}
          </Dialog.Description>
        )}
        {children}
        {canClose && (
          <Dialog.Close asChild {...closeProps}>
            <button
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute right-[10px] top-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <IonIcon name="close-outline" />
            </button>
          </Dialog.Close>
        )}
      </Dialog.Content>
    </Dialog.Portal>
  </Dialog.Root>
);

export default Modal;
