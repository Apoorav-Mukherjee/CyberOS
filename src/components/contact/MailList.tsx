import { useMailStore } from "../../store/mailStore";

export function MailList() {
  const { mails, selectedMailId, selectMail } = useMailStore();

  return (
    <div className="overflow-y-auto h-full">
      {mails.map((mail) => (
        <div
          key={mail.id}
          onClick={() => selectMail(mail.id)}
          className={`px-3 py-2 cursor-pointer border-b border-white/5
            ${selectedMailId === mail.id ? "bg-white/10" : "hover:bg-white/5"}`}
        >
          <div className="text-sm font-medium">{mail.from}</div>
          <div className="text-xs opacity-80 truncate">
            {mail.subject}
          </div>
        </div>
      ))}
    </div>
  );
}
