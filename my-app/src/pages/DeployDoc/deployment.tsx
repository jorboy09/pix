import { push } from "connected-react-router"
import { useState } from "react"
import { useDispatch } from "react-redux"
import { Link } from "react-router-dom"
import urljoin from "url-join"
import arrow_left from '../../button_img/arrow_left.svg'
import arrow_right from '../../button_img/arrow_right.svg'
import style from './deployment.module.css'

export function Deployment() {
    const [page, setPage] = useState<number>(0)
    const dispatch = useDispatch();
    const [creator, setCreator] = useState<string>('')
    const [front, setFront] = useState<string>('')
    const [api, setApi] = useState<string>('')

    return (
        <div className={style.container}>
            <div className={style.deployment}>
                <Link to='/loginPage' className={style.back}>Back</Link>
                <div className={style.header}>
                    <img src={arrow_left} alt='' onClick={() => page !== 0 ? setPage(page - 1) : null} style={page === 0 ? { visibility: 'hidden' } : {}} />
                    <div>
                        {page === 0 ? '準備' :
                            page === 1 ? 'GitLab' :
                                page === 2 ? 'DigitalOcean ~ 自訂網域名稱(1/2)' :
                                    page === 3 ? 'DigitalOcean ~ 自訂網域名稱(2/2)' :
                                        page === 4 ? 'Spaces(1/2)' :
                                            page === 5 ? 'Spaces(2/2)' :
                                                page === 6 ? 'App Platform(1/3)' :
                                                    page === 7 ? 'App Platform(2/3)' :
                                                        page === 8 ? 'App Platform(3/3)' :
                                                            page === 9 ? 'Droples(1/5)' :
                                                                page === 10 ? 'Droples(2/5)' :
                                                                    page === 11 ? 'Droples(3/5)' :
                                                                        page === 12 ? 'Droples(4/5)' :
                                                                            page === 13 ? 'Droples(5/5)' :
                                                                                page === 14 ? '留底少少資料去做推介啦~' : null}
                    </div>
                    <img src={arrow_right} alt='' onClick={() => page !== 13 ? setPage(page + 1) : dispatch(push("/RegisterPage"))} style={/*page === 13 ? { visibility: 'hidden' } : */{}} />
                </div>
                {page <= 0 ?
                    <div className={style.instruction}>
                        <p>想擁有屬於自己嘅專頁？ 快啲跟住以下嘅步驟啦！</p>
                        <p>開一個GitLab嘅帳號: <a href='https://gitlab.com/users/sign_in'>https://gitlab.com/users/sign_in</a></p>
                        <p>開一個Docker Hub嘅帳號: <a href='https://hub.docker.com/'>https://hub.docker.com/</a></p>
                        <p>開一個DigitalOcean嘅帳號: <a href='https://cloud.digitalocean.com/login'>https://cloud.digitalocean.com/login</a></p>
                        <p>買個屬於你自己嘅網域名稱 (Domain name)︰
                            <a href='https://www.namecheap.com/'>https://www.namecheap.com/</a>
                            <div>一啲頂級域名 (Top-level Domain) 例如︰.xyz 會比較平</div>
                        </p>
                    </div> : page === 1 ?
                        <div className={style.instruction}>
                            <p>而家喺GitLab到揀Create a project，之後再揀Import project。</p>
                            <p>喺Import project 個頁到，喺Import project from底下揀Repo by URL。</p>
                            <p>
                                <div>之後喺下面就會彈咗幾個輸入欄出嚟，我哋就會喺Git repository URL到放以下呢條網址︰</div>
                                <a href='https://gitlab.com/jorboy119/pix-frontend.git'>https://gitlab.com/jorboy119/pix-frontend.git</a>
                            </p>
                            <p>幫你自己嘅project改埋名之後就可以直接Create project喇~</p>
                            <p>當GitLab import完個project，你會見到有一堆檔案喺到，咁呢堆檔案就已經包含曬啲使用者介面㗎喇。</p>
                        </div> : page === 2 ?
                            <div className={style.instruction}>
                                <p>好喇，我哋搞掂咗GitLab之後呢就唔駛再理佢㗎喇。</p>
                                <p>而家呢我咃就去DigitalOcean整你個專頁背後嘅伺服器。</p>
                                <p>登入咗之後呢你會見到一個用你個名做預設嘅project。</p>
                                <p>你可以選擇用呢個預設嘅project，或者喺左邊，㩒個 + New Project，用一個新嘅project嚟做你嘅伺服器，咁當然要為你嘅新Project起返個名啦，喺之後Moving Resources 嗰到㩒Skip for Now就完成喇。</p>
                                <p>好喇，喺呢到我哋首先將先前買咗嘅網域名稱連嚟DigitalOcean。</p>
                                <p>喺左邊揀Networking，喺Domains呢個標籤下面Add a domain到打返你買咗嘅網域名稱啦，揀返你而家嘅project 名，再㩒Add Domain，你就成功喺DigitalOcean到加你個域名喇。</p>
                            </div> : page === 3 ?
                                <div className={style.instruction}>
                                    <p>但係你仲未成功連埋一齊㗎！</p>
                                    <p>㩒入去你啱啱加入嘅域名到，喺DNS records到會有3個NS Type嘅紀錄，各自都有唔同嘅數值，呢啲數值我哋一陣需要用嘅。</p>
                                    <p>而家我哋去返當初買網域名稱個網，登入返自己個帳號，喺自己個網域名稱到㩒Manage。</p>
                                    <p>我哋會喺NAMESERVERS嗰到，揀Custom DNS，喺下面打返啱啱喺DigitalOcean見到嘅嗰3個數值，記得要刪除最後嘅嗰個.。</p>
                                    <p>最後㩒個剔號就完成喇，不過注意返，都要等返15分鐘至45分鐘先完成連去DigitalOcean。</p>
                                </div> : page === 4 ?
                                    <div className={style.instruction}>
                                        <p>連完網域之後，我哋就要幫個專頁起返一個網上嘅儲存空間。返返去DigitalOcean，喺自己個project嘅主頁中間，有Create something new嘅部份，揀Start using Spaces，之後佢就會彈你去Create a Space嘅頁面喇。</p>
                                        <p>喺Create a Space嘅頁面上面呢，我哋首先喺Choose a datacenter region揀一個地方，邊到都得嘅。</p>
                                        <p>然後喺CDN 到，㩒Use a custom subdomain，再揀 + Add a new subdomain certificate，佢會有個Add custom subdomain彈出嚟。</p>
                                        <p>喺Use Let's Encrypt 嘅標籤底下，㩒Search for a domain on DigitalOcean，揀返啱啱加落去嘅網域名稱，喺Subdomains 嗰到，碌到最底揀最尾嗰個，喺Subdomain到打一個名落去，例如store。</p>
                                        <p>之後再喺Name this certificate到打個名，例如Spaces。最後㩒Generate就完成呢部份。</p>
                                        <p>最後喺Finalize and Create到幫呢個儲存空間加個副網域名，例如storing。喺下面揀埋而家個project就可以Create 喇~</p>
                                        <p>如果你㩒喺左手邊嘅Spaces呢，你會見到己經有你啱啱整出嚟嘅Spaces喇。</p>
                                        <p>之後我哋會做一樣嘢，就係整條Spaces嘅鎖匙出嚟比你個伺服器用喇。</p>
                                    </div> : page === 5 ?
                                        <div className={style.instruction}>
                                            <p>喺Spaces嘅頁面到，㩒Manage Keys，佢就會跳去Applications {'&'} API嘅頁面。喺Tokens/Keys 嘅標籤底下，喺Spaces access keys到㩒Generate New Key。</p>
                                            <p>之後就係Name到打個名比佢，例如store。再㩒個剔號。</p>
                                            <p>佢就會喺Key嗰到產生咗兩個數值，上面嗰個數值係會一直顯示出嚟嘅，但係下面嗰個數值就只係會顯示呢一次啫，咁所以一定一定一定要記底下面嗰個數值，之後會再用。</p>
                                            <p>咁Spaces嘅部分呢就告一段落喇。</p>
                                        </div> : page === 6 ?
                                            <div className={style.instruction}>
                                                <p>跟住呢，會喺App到繼續。</p>
                                                <p>首先㩒左邊嘅App，再㩒Launch my App，然後揀GitLab 做資料來源，佢會彈咗去GitLab嘅版面嘅，咁就㩒Autherize 。</p>
                                                <p>喺Connect your code到會見到GitLab嘅標誌。㩒Choose a repository，揀返啱啱喺GitLab 整出嚟嘅project啦。之後㩒Next。</p>
                                                <p>等一陣之後佢個就會去到Configure your app 嘅頁面。喺Type嗰到，唔要Web Service，揀Static Site。喺Build Command到，佢本身只係＄yarn build，㩒Edit，喺yarn build前面加yarn {'&&'}，變成yarn {'&&'} yarn build，之後Close返佢，㩒Next。</p>
                                                <p>幫你個App改名之後㩒Next。</p>
                                                <p>喺最後一個步驟，你需要揀一個計劃比你呢個App。咁我哋揀Starter就得喇。</p>
                                                <p>㩒埋Launch Starter App，之後就可以等個網去建構你個網出嚟喇。</p>
                                                <p>喺呢個過程，佢會有一個進度尺喺到，你想嘅話可以㩒右邊View logs去睇下佢背後係做緊咩~</p>
                                                <p>完成咗之後你就會有個佢比你嘅網址，你㩒落去呢就已經會彈個專頁出嚟㗎喇~</p>
                                                <p>不過，如果想用返自己個網域名稱嘅話，就要做多少少嘢喇。</p>
                                            </div> : page === 7 ?
                                                <div className={style.instruction}>
                                                    <p>首先㩒Settings，喺Domains嗰到，㩒Edit，再喺入面㩒+ Add Domain，就會去到Add Domain 嘅頁面，喺Domain or Subdomain Name* 到打返你個網域名，之後㩒一㩒個格出面，佢喺下面就會出現Choose DNS Management。</p>
                                                    <p>我哋就用返We manage your domain，之後可以直接Add Domain喇。</p>
                                                    <p>加完之後佢就會自動將你個網域名稱放喺你個App名下面。</p>
                                                </div> : page === 8 ?
                                                    <div className={style.instruction}>
                                                        <p>喺App 呢部分嘅最後，我哋要預先將呢個專頁，駁去Spaces同一個未出現嘅副網域名稱，而呢個網域名稱將會係你個伺服器嘅副網域名稱。</p>
                                                        <p>首先㩒Components，喺Environment Variables到㩒Edit，喺第一個key到打 REACT_APP_BACKEND_URL，而value會係https://api 加你個網域名，成個數值就好似https://api.abcdefc.xyz。</p>
                                                        <p>之後㩒加號，喺第二個key打 REACT_APP_DO_SPACE_URL，value就會係你個spaces嘅位置。</p>
                                                        <p>如果唔記得咗嘅話，可以㩒上面個Cloud，去返Spaces，揀返你個Space，喺個名下面會有Endpoints呢個字。</p>
                                                        <p>將個鼠標放喺Endpoints個字上面，會出面3條網址，3條都可以就咁複製，貼上去REACT_APP_DO_SPACE_URL個value到。但係最好就放Subdomain嗰條網址。</p>
                                                        <p>最後為咗個專頁可以喺唔同頁面之間轉換，我哋要喺Components嘅Custom Pages到㩒個箭咀。</p>
                                                        <p>佢就會出現Errors同Page Name，我哋喺Errors到揀Catchall，Page Name就打返index.html，㩒Save，就完成喇~</p>
                                                    </div> : page === 9 ?
                                                        <div className={style.instruction}>
                                                            <p>好喇~終於到最後一部分喇~㩒上面Cloud出返去，再喺左邊揀返自己個project。喺Resources嘅標籤底下，㩒Get Started with a Droplet，就會入去Create Droplets嘅頁面。</p>
                                                            <p>入到去第一部分就係Choose an image，咁就喺Distributions底下用Ubuntu嘅20.04 (LTS) x64。</p>
                                                            <p>喺Choose a plan底下，揀任何一個計劃都可以，喺呢到就會揀Basic入面嘅$5/mo。</p>
                                                            <p>去到Choose a datacenter region，揀其中一個比較近嘅地方，喺呢到會揀Singapore。</p>
                                                            <p>然後喺Authentication到，揀Password，諗返一個密碼用嚟登入返呢個Droplet。</p>
                                                            <p>最後喺Finalize and create到，你可以喺Choose a hostname到幫你個Droplet改返個名。</p>
                                                            <p>然後喺Select Project到揀返而家個project，㩒Create Droplet，你就會有一個Droplet喇。</p>
                                                            <p>而家㩒左邊嘅Droplets會見到你啱啱創建嘅Droplet，㩒落個Droplet到，你就可以睇到呢個Droplet嘅情況喇。</p>
                                                        </div> : page === 10 ?
                                                            <div className={style.instruction}>
                                                                <p>如果想設置個Droplet成為你個網頁嘅伺服器，你就要㩒個On掣下面嘅Console。</p>
                                                                <p>佢就會彈一個視窗出嚟，嚟緊嘅所有嘢都會喺呢個介面到做，但係放心，以下會將每一個指令都寫出嚟。記得輸入一個指令之後要㩒Enter，等佢行完之後先再入另一個指令。</p>
                                                                <p>首先，要登入。Username係 root ，而Password就係你啱啱創建Droplet嗰陣打嘅密碼。</p>
                                                                <p>
                                                                    <div>之後就要安裝Docker 喺個Droplet 入面(逐句逐句複製貼上就得)︰</div>
                                                                    <div className={style.code}>
                                                                        <div>apt-get update</div>
                                                                        <div>apt-get install apt-transport-https ca-certificates curl gnupg-agent software-properties-common</div>
                                                                        <div>curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -</div>
                                                                        <div>add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"</div>
                                                                        <div>apt-get update</div>
                                                                        <div>apt-get install docker-ce docker-ce-cli containerd.io</div>
                                                                    </div>
                                                                </p>
                                                                <p>打曬啲指令之後就已經將Docker裝咗落去喇。</p>
                                                                <p>
                                                                    <div>而家就要登入返Docker︰</div>
                                                                    <div className={style.code}>
                                                                        <div>docker login</div>
                                                                    </div>
                                                                    <div>喺Username到打返你一開始登記Docker Hub嗰陣個名，喺Password打返你個Docker Hub 帳號嘅密碼。</div>
                                                                </p>
                                                            </div> : page === 11 ?
                                                                <div className={style.instruction}>
                                                                    <p>
                                                                        <div>當你成功登入之後，第一樣嘢就係要令個Droplet有多啲位去做嘢︰</div>
                                                                        <div className={style.code}>
                                                                            <div>swapon --show</div>
                                                                            <div>free -h</div>
                                                                            <div>df -h</div>
                                                                            <div>fallocate -l 1G /swapfile</div>
                                                                            <div>ls -lh /swapfile</div>
                                                                            <div>chmod 600 /swapfile</div>
                                                                            <div>ls -lh /swapfile</div>
                                                                            <div>mkswap /swapfile</div>
                                                                            <div>swapon /swapfile</div>
                                                                            <div>swapon --show</div>
                                                                            <div>free -h</div>
                                                                        </div>
                                                                    </p>
                                                                </div> : page === 12 ?
                                                                    <div className={style.instruction}>
                                                                        <p>
                                                                            <div>令完個Droplet有多啲位去做嘢之後呢就開始要將用嘅嘢下戴落嚟喇~</div>

                                                                            <div className={style.code}>
                                                                                <div>docker pull stephenjor/pix-backend</div>
                                                                            </div>
                                                                        </p>
                                                                        <p>
                                                                            <div>行完啱啱句指令之後呢就要係到開返個文字檔案儲低屬於你自己嘅數值比個伺服器用︰</div>
                                                                            <div>首先行呢句開個檔案出嚟︰</div>
                                                                            <div className={style.code}>
                                                                                <div>nano envfile</div>
                                                                            </div>
                                                                        </p>
                                                                        <p>
                                                                            <div>係個檔案入面要有呢幾行︰</div>
                                                                            <div className={style.code}>
                                                                                <div>REACT_DB=pix</div>
                                                                                <div>REACT_USER=pix_creator</div>
                                                                                <div>REACT_PASSWORD=123321</div>
                                                                                <div>REACT_HOST= (你啱啱個App條網址)</div>
                                                                                <div>BUCKET_NAME= (你個Space嘅名)</div>
                                                                                <div>S3_ENDPOINT= (你個Space個名下面Endpoints入面，Origin嗰條，不過要將前面剪咗佢，例如https://store.fra1.digitaloceanspaces.com變做fra1.digitaloceanspaces.com)</div>
                                                                                <div>AWS_ACCESS_KEY_ID= (之前係Application {'&'} API嗰到整出嚟嘅上面條Key)</div>
                                                                                <div>AWS_SECRET_ACCESS_KEY= (之前係Application {'&'} API嗰到整出嚟嘅下面條Key)</div>
                                                                                <div>API_HOST= (宜家呢個伺服器個網址，例如api.abcdef.xyz，唔駛http://)</div>
                                                                                <div>EMAIL= (求其一個你自己嘅電郵地址)</div>
                                                                                <div>JWT_SECRET='hi'</div>
                                                                            </div>
                                                                        </p>
                                                                        <p>打曬之後，就㩒 Ctrl + X，再㩒Enter就完成喇。</p>
                                                                    </div> : page === 13 ?
                                                                        <div className={style.instruction}>
                                                                            <p>之後係返出面揀左邊嘅Networking。喺Domains 底下㩒自己個網域名稱。</p>
                                                                            <p>喺Create new record底下揀 A 標籤，喺Hostname到打api，喺Will direct to 揀返你個Droplet。㩒Create Record。</p>
                                                                            <p>
                                                                                <div>最後最後最後，當完成埋呢個檔案之後就可以打以下呢句指令︰</div>
                                                                                <div className={style.code}>
                                                                                    <div>docker run -d -it -p 80:80 --env-file envfile --name=pix-backend --network host stephenjor/pix-backend</div>
                                                                                </div>
                                                                            </p>
                                                                            <p>
                                                                                <div>之後就可以打以下呢句指令去睇下佢係背後做緊啲咩︰</div>
                                                                                <div className={style.code}>
                                                                                    <div>docker logs -f pix-backend</div>
                                                                                </div>
                                                                            </p>
                                                                            <p>
                                                                                <div>當你見到最後顯示以下呢句嘅話就真正完成喇~(直接㩒X就閂得㗎喇)</div>
                                                                                <div className={style.code}>
                                                                                    <div>Listening on port 8080</div>
                                                                                </div>
                                                                            </p>
                                                                            <p>恭喜曬，你成功擁有屬於自己嘅專頁同網頁喇~~~</p>
                                                                        </div> :
                                                                        <div className={style.reference}>
                                                                            <form className={style.reference_form} onSubmit={async (event) => {
                                                                                event.preventDefault()
                                                                                try {
                                                                                    const initRes = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/newDomainInit'), {
                                                                                        method: 'post',
                                                                                        headers: {
                                                                                            'Content-Type': 'application/json'
                                                                                        },
                                                                                        body: JSON.stringify({ api: api })
                                                                                    })
                                                                                    const initjson = await initRes.json()
                                                                                    if (initjson.result) {
                                                                                        const updateRes = await fetch(urljoin(`${process.env.REACT_APP_BACKEND_URL}`, '/updateAllDomain'), {
                                                                                            method: 'post',
                                                                                            headers: {
                                                                                                'Content-Type': 'application/json'
                                                                                            },
                                                                                            body: JSON.stringify({ creator: creator, front: front, api: api })
                                                                                        })
                                                                                        const updatejson = await updateRes.json()
                                                                                        if (updatejson.result) {
                                                                                            alert('成功！')
                                                                                        }else{
                                                                                            alert('失敗！睇下有冇打錯啦~')
                                                                                        }
                                                                                    }else{
                                                                                        alert('失敗！睇下有冇打錯啦~')
                                                                                    }
                                                                                } catch (e) {
                                                                                    alert('失敗！睇下有冇打錯啦~')
                                                                                }
                                                                            }
                                                                            }>
                                                                                係你走之前，留底少少你專頁嘅資料啦(冇得改㗎~)：
                                                                                <div>
                                                                                    <div className={style.label}>名字︰</div>
                                                                                    <input type='text' value={creator} onChange={(event) => setCreator(event.currentTarget.value)}></input>
                                                                                </div>
                                                                                <div>
                                                                                    <div className={style.label}><div>專頁網址︰</div><div>(例如https://abcdefg.xyz)</div></div>
                                                                                    <input type='text' value={front} onChange={(event) => setFront(event.currentTarget.value)}></input>
                                                                                </div>
                                                                                <div>
                                                                                    <div className={style.label}><div>專頁嘅Droplet網址︰</div><div>(例如https://api.abcdefg.xyz)</div></div>
                                                                                    <input type='text' value={api} onChange={(event) => setApi(event.currentTarget.value)}></input>
                                                                                </div>
                                                                                <button className={style.submit} type='submit'>留低</button>
                                                                            </form>
                                                                        </div>}
                <div className={style.page_no}>{page + 1}</div>
            </div>
        </div>)
}