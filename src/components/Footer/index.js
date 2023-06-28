import './footer.css';
import { TfiInstagram } from 'react-icons/tfi';
import { GrLinkedin } from 'react-icons/gr';
import { FaGithub } from 'react-icons/fa';
import { FcGoogle } from 'react-icons/fc';


export default function Footer() {
    return(
        <footer className='containerRodape'>
            <div className='social'>

                <a href="https://www.instagram.com/jlms.dev/" className='iconSocial' target='blank'>
                    <TfiInstagram  size={35} color='#FFF'/>
                </a>

                <a href="https://www.linkedin.com/in/jlucasmelo/" className='iconSocial' target='blank'>
                    <GrLinkedin  size={35} color='#FFF'/> 
                </a>

                <a href="https://github.com/jlmsdev" className='iconSocial' target='blank'> 
                    <FaGithub size={35} color='#FFF'/>
                </a>

                <a href="https://g.dev/joaolucas" className='iconSocial' target='blank'> 
                    <FcGoogle size={35} color='#FFF'/>
                </a>

            </div>
        </footer>
    );
}