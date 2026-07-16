import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5"; // иконка крестика
import styles from "./UserModal.module.css";

function UserModal({ user, onClose }) {
  if (!user) return null;

  return (
    <AnimatePresence>
      <motion.div
        className={styles.overlay}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.2 }}
      >
        <motion.div
          className={styles.modal}
          onClick={(e) => e.stopPropagation()}
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.8, opacity: 0 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
        >
          <button className={styles.closeButton} onClick={onClose}>
            <IoClose size={28} />
          </button>

          <img src={user.image} alt={`${user.firstName} ${user.lastName}`} />
          <h2>
            {user.lastName} {user.firstName} {user.maidenName}
          </h2>
          <p>
            <strong>Возраст:</strong> {user.age}
          </p>
          <p>
            <strong>Телефон:</strong> {user.phone}
          </p>
          <p>
            <strong>Email:</strong> {user.email}
          </p>
          <p>
            <strong>Рост:</strong> {user.height} см
          </p>
          <p>
            <strong>Вес:</strong> {user.weight} кг
          </p>
          <p>
            <strong>Адрес:</strong>
            <br />
            {user.address.address}
            <br />
            {user.address.city}, {user.address.state}
            <br />
            {user.address.country}
          </p>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}

export default UserModal;
