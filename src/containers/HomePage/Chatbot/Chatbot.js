import React, { Component } from 'react';
import { connect } from "react-redux";
import axios from 'axios';
import './Chatbot.scss';
import HomeHeader from '../HomeHeader';

class Chatbot extends Component {
    constructor(props) {
        super(props);
        this.state = {
            inputMessage: '',
            messages: [],
            showSuggestions: true, // Trạng thái hiển thị câu hỏi gợi ý
            suggestions: [
                "Tư vấn về bệnh tim mạch",
                "Tư vấn về bệnh xương khớp",
                "Hướng dẫn sử dụng thuốc"
            ]
        };
    }

    // Gọi API chatbot và lấy phản hồi khi component được mount
    async componentDidMount() {
        const botStartMessage = { bot: "Xin chào! Tôi có thể giúp gì được cho bạn?", isBot: true };
        this.setState({
            messages: [botStartMessage]
        });
    }

    handleMessageChange = (event) => {
        this.setState({
            inputMessage: event.target.value
        });
    };

    handleSendMessage = async () => {
        let { inputMessage, messages } = this.state;

        if (!inputMessage.trim()) return;

        // Thêm tin nhắn của người dùng vào lịch sử
        const userMessage = { user: inputMessage, isBot: false };
        this.setState({
            messages: [...messages, userMessage],
            inputMessage: ''
        });

        try {
            // Gửi tin nhắn tới API Flask và nhận phản hồi từ chatbot
            const response = await axios.post('http://localhost:5000/get-response', {
                message: inputMessage
            });

            if (response.data && response.data.response) {
                // Thêm phản hồi của bot vào lịch sử
                const botMessage = { bot: response.data.response, isBot: true };
                this.setState((prevState) => ({
                    messages: [...prevState.messages, botMessage]
                }));
            }
        } catch (error) {
            console.error('Error sending message to bot:', error);
            const errorMessage = { bot: "Sorry, I don't understand that.", isBot: true };
            this.setState((prevState) => ({
                messages: [...prevState.messages, errorMessage]
            }));
        }
    };

    handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            event.preventDefault(); // Ngừng hành động mặc định (không cho phép thêm dòng mới trong input)
            this.handleSendMessage(); // Gửi tin nhắn
        }
    };

    // Xử lý khi người dùng nhấn chọn câu hỏi gợi ý
    handleSuggestionClick = (suggestion) => {
        this.setState({
            inputMessage: suggestion,
            showSuggestions: false // Ẩn các câu hỏi gợi ý khi người dùng chọn
        }, () => {
            this.handleSendMessage();
        });
    };

    render() {
        const { inputMessage, messages, suggestions, showSuggestions } = this.state;

        return (
            <>
                <HomeHeader />
                <div className='chatbot-container'>
                    <div className="chat-box">
                        {messages.map((msg, index) => (
                            <div key={index} className={msg.isBot ? 'bot-msg' : 'user-msg'}>
                                {msg.isBot && (
                                    <div className="bot-info">
                                        <img src="https://cdn.bookingcare.vn/fo/w48/2024/04/25/142829-ai-assistant.png" alt="Bot Avatar" className="bot-avatar" />
                                        <span className="bot-label">Trả lời</span>
                                    </div>
                                )}
                                {msg.isBot ? (
                                    <div dangerouslySetInnerHTML={{ __html: msg.bot }}></div>
                                ) : (
                                    msg.user
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Các câu hỏi gợi ý chỉ hiển thị khi showSuggestions là true */}
                    {showSuggestions && (
                        <div className="suggestions">
                            {suggestions.map((suggestion, index) => (
                                <div
                                    key={index}
                                    className="suggestion"
                                    onClick={() => this.handleSuggestionClick(suggestion)}
                                >
                                    {suggestion}
                                </div>
                            ))}
                        </div>
                    )}

                    <div className="chat-input">
                        <input
                            type="text"
                            value={inputMessage}
                            onChange={this.handleMessageChange}
                            onKeyDown={this.handleKeyDown}
                            placeholder="Type your message..."
                        />
                        <i className="fas fa-paper-plane" onClick={this.handleSendMessage}></i>
                    </div>
                </div>
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        language: state.app.language
    };
};

const mapDispatchToProps = (dispatch) => {
    return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(Chatbot);
