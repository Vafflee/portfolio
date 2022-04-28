import React, { useRef } from 'react'

type ModalProps = {
    isActive: boolean,
    toggleModal: () => void
}

export const ModalMessage:React.FC<ModalProps> = ({ isActive, toggleModal }) => {

    function is_touch_device() {
        return !!('ontouchstart' in window);
    } 

    const nameRef = useRef<HTMLInputElement>(null);
    const textRef = useRef<HTMLTextAreaElement>(null);
    const contactRef = useRef<HTMLTextAreaElement>(null);

    return (
        <div className={"modal modal-message " + (isActive ? '_active' : '')} onClick={() => toggleModal()}>
            <h2 className="h2 modal-message__title">Send me an email</h2>
            <form
                onClick={event => event.stopPropagation()}
                className="modal-message__form"
                action="https://formspree.io/f/xrgjkqyb"
                method="post"
                onSubmit={() => {
                    nameRef.current!.value = '';
                    textRef.current!.value = '';
                    contactRef.current!.value = '';
                    toggleModal()
                }}
            >
                <input ref={nameRef} type="text" name="name" placeholder="Name" />
                <textarea ref={textRef} name="message" placeholder="Your message"></textarea>
                <textarea
                    ref={contactRef}
                    name="contacts"
                    placeholder="How can I contact you"
                ></textarea>
                <button>Send</button>
            </form>
        </div>
    )
}
