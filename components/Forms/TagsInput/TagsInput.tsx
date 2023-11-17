import { useState } from "react";

const TagsInput = () => {
    const [tags, setTags] = useState<any>([]);
    console.log({ tags });

    function handleKeyDown(e: any) {
        if (e.key !== "Enter") return;
        const value = e.target.value;
        if (!value.trim()) return;
        setTags([...tags, value]);
        e.target.value = "";
    }

    function removeTag(index: any) {
        setTags(tags.filter((el: any, i: any) => i !== index));
    }

    return (
        <div className="flex flex-wrap items-center gap-[0.5em] rounded-md   border-2 border-solid border-black p-[0.5em]">
            {tags.map((tag: any, index: any) => (
                <div className="inline-block rounded-[20px] bg-[rgb(218,216,216)] px-[0.75em] py-[0.5em]" key={index}>
                    <span className="text">{tag}</span>
                    <span className="ml-[0.5em] inline-flex h-5 w-5 cursor-pointer items-center justify-center rounded-[50%] bg-[rgb(48,48,48)] text-lg text-white" onClick={() => removeTag(index)}>
                        &times;
                    </span>
                </div>
            ))}
            <input onKeyDown={handleKeyDown} type="text" className="grow bg-transparent px-0 py-[0.5em] outline-none" placeholder="Ketik keywords" />
        </div>
    );
};

export default TagsInput;
