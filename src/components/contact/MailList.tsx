import { useMailStore } from "../../store/mailStore";
import { motion } from "framer-motion";

export function MailList() {
  const { mails, selectedMailId, selectMail } = useMailStore();

  return (
    <div className="overflow-y-auto h-full">
      {mails.map((mail) => (
        <motion.div
          key={mail.id}
          layout
          initial={{ opacity: 0, y: 4 }}
          animate={{ opacity: 1, y: 0 }}
          whileHover={{ backgroundColor: "rgba(255,255,255,0.08)" }}
          transition={{ duration: 0.15 }}
          onClick={() => selectMail(mail.id)}
          className={`px-3 py-2 cursor-pointer border-b border-white/5
            ${selectedMailId === mail.id ? "bg-white/10" : "hover:bg-white/5"}`}
        >
          <div className="text-sm font-medium">{mail.from}</div>
          <div className="text-xs opacity-80 truncate">
            {mail.subject}
          </div>
        </motion.div>
      ))}
    </div>
  );
}
