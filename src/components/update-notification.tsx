interface UpdateNotificationProps {
  onUpdate: VoidFunction;
  onDismiss: VoidFunction;
}
export default function UpdateNotification({ onUpdate, onDismiss }: UpdateNotificationProps) {
  return (
    <div className="update-notification">
      <div className="update-content">
        <p className="update-message">A new version is available!</p>
        <div className="update-actions">
          <button className="update-btn update-btn-primary" onClick={onUpdate}>
            Update Now
          </button>
          <button className="update-btn update-btn-secondary" onClick={onDismiss}>
            Later
          </button>
        </div>
      </div>
    </div>
  );
}
