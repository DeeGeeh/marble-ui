import { DocumentTextIcon, XMarkIcon } from "@heroicons/react/24/outline"
import {
  Attachment,
  AttachmentAction,
  AttachmentActions,
  AttachmentContent,
  AttachmentDescription,
  AttachmentMedia,
  AttachmentTitle,
} from "@/components/ui/attachment"

export default function AttachmentExample() {
  return (
    <div className="flex w-full max-w-sm flex-col gap-3">
      <Attachment>
        <AttachmentMedia>
          <DocumentTextIcon />
        </AttachmentMedia>
        <AttachmentContent>
          <AttachmentTitle>quarterly-report.pdf</AttachmentTitle>
          <AttachmentDescription>2.4 MB</AttachmentDescription>
        </AttachmentContent>
        <AttachmentActions>
          <AttachmentAction aria-label="Remove">
            <XMarkIcon />
          </AttachmentAction>
        </AttachmentActions>
      </Attachment>
      <Attachment size="sm" state="uploading">
        <AttachmentContent>
          <AttachmentTitle>screenshot.png</AttachmentTitle>
        </AttachmentContent>
      </Attachment>
    </div>
  )
}
