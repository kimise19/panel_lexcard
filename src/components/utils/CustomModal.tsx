import { animated, useSpring } from "@react-spring/web";
import { Modal } from "flowbite-react";
import { useEffect } from "react";

interface CustomModalProps {
  show: boolean;
  onClose: () => void;
  icon: React.ElementType;
  message: string;
  iconColor: string;
}

const CustomModal: React.FC<CustomModalProps> = ({
  show,
  onClose,
  icon: Icon,
  message,
  iconColor,
}) => {
  const iconAnimation = useSpring({
    transform: show ? "scale(1)" : "scale(0.5)",
    opacity: show ? 1 : 0,
    config: { tension: 200, friction: 12 },
  });

  useEffect(() => {
    if (show) {
      const timer = setTimeout(() => {
        onClose();
      }, 1500);
      return () => clearTimeout(timer);
    }
  }, [show, onClose]);

  return (
    <Modal show={show} size="md" onClose={onClose} popup dismissible>
      <Modal.Header />
      <Modal.Body>
        <div className="text-center">
          <animated.div style={iconAnimation}>
            <Icon className={`mx-auto mb-4 h-14 w-14 ${iconColor}`} />
          </animated.div>
          <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
            {message}
          </h3>
        </div>
      </Modal.Body>
    </Modal>
  );
};

export default CustomModal;
