export const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: i * 0.1,
        duration: 0.5,
        ease: "easeOut",
      },
    }),
    whileHover: {
      scale: 1.03,
      transition: { duration: 0.2 },
    },
    whileTap: {
      scale: 0.95,
    },
  };
  
  export const fadeUpTitle = {
    initial: { opacity: 0, y: -10 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };
  