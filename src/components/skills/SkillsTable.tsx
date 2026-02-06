import { useSkillsStore } from "../../store/skillsStore";
import { motion } from "framer-motion";

export function SkillsTable() {
    const skills = useSkillsStore((s) => s.skills);

    return (
        <table className="w-full border-collapse text-sm">
            <thead className="bg-white/10 sticky top-0">
                <tr>
                    <th className="border border-white/10 px-2 py-1 text-left">Skill</th>
                    <th className="border border-white/10 px-2 py-1 text-left">Category</th>
                    <th className="border border-white/10 px-2 py-1 text-left">Level</th>
                    <th className="border border-white/10 px-2 py-1 text-left">Experience</th>
                    <th className="border border-white/10 px-2 py-1 text-left">Notes</th>
                </tr>
            </thead>

            <tbody>
                {skills.map((skill) => (
                    <motion.tr
                        key={skill.id}
                        layout
                        whileHover={{ backgroundColor: "rgba(255,255,255,0.05)" }}
                        transition={{ duration: 0.1 }}>
                        <td className="border border-white/10 px-2 py-1">
                            {skill.name}
                        </td>
                        <td className="border border-white/10 px-2 py-1">
                            {skill.category}
                        </td>
                        <td className="border border-white/10 px-2 py-1">
                            {"★".repeat(skill.level)}
                        </td>
                        <td className="border border-white/10 px-2 py-1">
                            {skill.experience}
                        </td>
                        <td className="border border-white/10 px-2 py-1 opacity-80">
                            {skill.notes ?? "-"}
                        </td>
                    </motion.tr>
                ))}
            </tbody>
        </table>
    );
}
