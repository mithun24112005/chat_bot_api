import React, { useContext, useRef, useEffect } from "react";
import "./Main.css";
import { assets } from "../../assets/assets";
import Context from '../context/Context'

function Main() {
    const { onSent, messages, loading, setinput, input } = useContext(Context);
    const chatEndRef = useRef(null);

    function handleonchange(event) {
        setinput(event.target.value)
    }
    function handleonclick() {
        onSent(input);
    }

    // Scroll to bottom on new message
    useEffect(() => {
        chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages, loading]);

    return (
        <div className="main">
            <div className="nav">
                <p>Gemini</p>
                <img src={assets.user_icon} alt="" />
            </div>
            <div className="main-container" style={{ flex: 1, width: "100%", overflowY: "auto", marginBottom: 0 }}>
                <div className="chat-area">
                    {messages.length === 0 && (
                        <div className="greet">
                            <p>
                                <span>Hello, Dev</span>
                            </p>
                            <p>How can I help you today?</p>
                        </div>
                    )}
                    {messages.map((msg, idx) => (
                        <div
                            key={idx}
                            className={`chat-bubble ${msg.role === "user" ? "user" : "gemini"}`}
                        >
                            {msg.text}
                        </div>
                    ))}
                    {loading && (
                        <div className="chat-bubble gemini">
                            <span>Gemini is typing...</span>
                        </div>
                    )}
                    <div ref={chatEndRef} />
                </div>
            </div>
            <div className="main-bottom">
                <div className="search-box">
                    <input
                        onChange={handleonchange}
                        type="text"
                        placeholder="Enter the prompt here"
                        value={input}
                        onKeyDown={e => {
                            if (e.key === "Enter" && !loading) handleonclick();
                        }}
                        disabled={loading}
                    />
                    <img src={assets.gallery_icon} alt="" />
                    <img src={assets.mic_icon} alt="" />
                    <img onClick={handleonclick} src={assets.send_icon} alt="" style={{ opacity: loading ? 0.5 : 1, pointerEvents: loading ? "none" : "auto" }} />
                </div>
                <p>Gemini can make mistakes, so double-check it</p>
            </div>
        </div>
    );
}

export default Main;
