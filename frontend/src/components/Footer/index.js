import './index.css'
import { Link } from 'react-router-dom'
export function Footer() {
    return (
        <footer>
            <div className="footer-container">
                <div className="footer-left">
                    <div style={{fontWeight: 700}}>
                        2022 Haairbnb
                    </div>
                    <div className='personal-link'>
                        <a href='https://www.linkedin.com/in/havietng/' target="_blank">Linkedin</a>
                    </div>
                    <div className='personal-link'>
                        <a href='https://github.com/vietha3110' target="_blank">Github</a>
                    </div>
                    <div>
                        Destinations
                    </div>
                </div>
                <div></div>
                <div className="footer-right">
                    <div>
                        English (US)
                    </div>
                    <div>
                        $ USD
                    </div>
                    <div>
                        Support & Resource
                    </div>
                </div>
            </div>
        </footer>
    )
}
