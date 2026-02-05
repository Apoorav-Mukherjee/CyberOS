import { create } from "zustand";

export type Mail = {
  id: string;
  from: string;
  subject: string;
  body: string;
  timestamp: number;
};

interface MailStore {
  mails: Mail[];
  selectedMailId: string | null;

  selectMail: (id: string) => void;
  sendMail: (mail: Omit<Mail, "id" | "timestamp">) => void;
}

export const useMailStore = create<MailStore>((set) => ({
  mails: [
    {
      id: crypto.randomUUID(),
      from: "system@cyberos",
      subject: "Welcome to CyberOS",
      body: "This is your local mail client. All mails are stored locally.",
      timestamp: Date.now(),
    },
  ],

  selectedMailId: null,

  selectMail: (id) =>
    set(() => ({
      selectedMailId: id,
    })),

  sendMail: (mail) =>
    set((state) => {
      const newMail: Mail = {
        id: crypto.randomUUID(),
        timestamp: Date.now(),
        ...mail,
      };

      return {
        mails: [newMail, ...state.mails],
        selectedMailId: newMail.id,
      };
    }),
}));
