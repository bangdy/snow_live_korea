import { AnimatePresence, motion } from "framer-motion";

export const PageChange = ({ children }) => {
  const variants = {
    initial: {
      opacity: 0,
      y: 12,
    },
    enter: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.4,
        ease: [0.61, 1, 0.88, 1],
      },
    },
  };
  return (
    <AnimatePresence>
      <motion.div initial="initial" animate="enter" variants={variants}>
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export const EnterButton = ({ children, trigger }) => {
  const variants = {
    trigger: {
      y: [0, -4],
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <motion.div animate={trigger && "trigger"} variants={variants}>
      {children}
    </motion.div>
  );
};
