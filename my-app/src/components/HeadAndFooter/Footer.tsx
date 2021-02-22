import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
const year = 2021

export function Footer() {
    const creatorName = useSelector((state: RootState) => state.curUser.username);
    const curUserColour = useSelector((state: RootState) => state.curUser.colour_theme);
    const themes = useSelector((state: RootState) => state.curUser.TA);

    return (
        <div className="footer" style={{
            backgroundColor: themes[curUserColour][3].colour
        }}>
            <div>© {year} {creatorName}</div>
            <div>THEME CREATED BY PIX</div>
        </div>
    )
}