import styles from "./UserModal.module.css";

function UserModal({ user, onClose }) {
  if (!user) {
    return null;
  }

  return (
    <div className={styles.overlay} onClick={onClose}>
      <div
        className={styles.modal}
        onClick={(event) => event.stopPropagation()}
      >
        <button
          className={styles.closeButton}
          onClick={onClose}
        >
          ✕
        </button>

        <img
          src={user.image}
          alt={`${user.firstName} ${user.lastName}`}
        />

        <h2>
          {user.lastName} {user.firstName} {user.maidenName}
        </h2>

        <p><strong>Возраст:</strong> {user.age}</p>
        <p><strong>Телефон:</strong> {user.phone}</p>
        <p><strong>Email:</strong> {user.email}</p>
        <p><strong>Рост:</strong> {user.height} см</p>
        <p><strong>Вес:</strong> {user.weight} кг</p>

        <p>
          <strong>Адрес:</strong><br />
          {user.address.address}<br />
          {user.address.city}, {user.address.state}<br />
          {user.address.country}
        </p>
      </div>
    </div>
  );
}

export default UserModal;