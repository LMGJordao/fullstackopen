//
const Notification = ({message, type}) => {
    const notification_type = type === 'success'
        ? 'notification__success'
        : 'notification__failure';
    return message === null
        ? null
        : <div className={`notification ${notification_type}`}>{message}</div>;
};

export default Notification;