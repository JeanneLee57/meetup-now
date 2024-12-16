import { IoCloseOutline } from 'react-icons/io5';

const Modal = ({
  children,
  onClose,
  title,
}: {
  children: React.ReactNode;
  onClose: () => void;
  title: string;
}) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-8 rounded-md max-h-[80vh] overflow-y-auto">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold mb-4">{title}</h1>
          <div
            className="flex justify-end mb-4 cursor-pointer hover:opacity-80 transition-opacity"
            onClick={onClose}
          >
            <IoCloseOutline size={24} />
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default Modal;
