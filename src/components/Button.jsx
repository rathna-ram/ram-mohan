const Button = ({ text, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="px-4 py-2 rounded-lg text-white bg-blue-500 hover:bg-green-600"
    >
      {text}
    </button>
  );
};

export default Button;