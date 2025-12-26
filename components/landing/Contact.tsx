export default function Contact() {
    return (
        <section id="contact" className="contact-section section">
            <div className="contact-container">
                <div className="contact-content">
                    <h2 className="contact-title">
                        Let's Build Intelligent
                        <br className="none" /> Systems Together
                    </h2>
                </div>

                <div className="contact-form-wrapper">
                    <form className="contact-form">
                        <div className="form-group">
                            <input
                                type="text"
                                className="form-input"
                                placeholder="Name"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="email"
                                className="form-input"
                                placeholder="Email"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <input
                                type="tel"
                                className="form-input"
                                placeholder="Phone"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <textarea
                                className="form-input form-textarea"
                                placeholder="Message"
                                rows={1}
                                required
                            ></textarea>
                        </div>
                        <button type="submit" className="form-submit">
                            Start the Conversation
                        </button>
                    </form>
                </div>
            </div>
        </section>
    );
}
