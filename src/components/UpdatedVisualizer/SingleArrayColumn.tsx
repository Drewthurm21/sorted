import { motion } from "framer-motion";

type SingleColumnProps = {
  key: number;
  value: number;
  speed: number;
};

export const SingleArrayColumn = ({ key, value, speed }: SingleColumnProps) => {
  return (
    <motion.div
      key={key}
      layout
      className={`text-center min-w-[30px]`}
      transition={{ duration: speed, type: "spring" }}
    >
      <motion.div layout className="text-emerald-400" style={{ y: -20 }}>
        {value}
      </motion.div>
      <motion.div
        layout
        className="bg-violet-600"
        style={{
          height: `${value / 2}px`,
        }}
      />
    </motion.div>
  );
};
