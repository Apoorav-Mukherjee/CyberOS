import { useMailStore } from "../../store/mailStore";

export function MailView() {
  const { mails, selectedMailId } = useMailStore();
  const mail = mails.find((m) => m.id === selectedMailId);

  if (!mail) {
    return (
      <div className="h-full flex items-center justify-center text-white/50">
        Select a message to read
      </div>
    );
  }

  return (
    <div className="p-4 space-y-4">
      <div>
        <div className="text-sm opacity-70">From</div>
        <div className="font-medium">{mail.from}</div>
      </div>

      <div>
        <div className="text-sm opacity-70">Subject</div>
        <div className="font-semibold">{mail.subject}</div>
      </div>

      <div className="pt-4 border-t border-white/10 whitespace-pre-wrap">
        {mail.body}
      </div>
    </div>
  );
}
