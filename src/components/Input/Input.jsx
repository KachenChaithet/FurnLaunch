const Input = ({ title, width, higth, placeholder, onChange, required, value }) => {

    const handleInputChange = (e) => {
        if (onChange) onChange(e.target.value); // ส่งค่ากลับ parent
    };

    return (
        <div className="font-Poppins space-y-[22px]">
            {title && <h1 className="font-medium text-[16px]">{title}</h1>}
            <input
                type="text"
                placeholder={placeholder}
                className={`outline-0 rounded-lg border-[#9F9F9F] pl-8 border`}
                style={{ width: `${width}px`, height: `${higth}px` }}
                value={value}
                onChange={handleInputChange} // นี่สำคัญ
                required={required} //
            />
        </div>
    );
};

export default Input;
