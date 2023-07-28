import React ,{useEffect,useState}from 'react'
import "./ArticleDetails.styles.scss";
import { useParams } from 'react-router-dom';
import {getArticleBySLug} from "../../../Api/articles";
import Loading from '../../../components/Loading/Loading.component';
import moment from "moment";
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import Button from '../../../components/Button/Button.component';
import EditIcon from '@mui/icons-material/Edit';

import { useSelector } from 'react-redux';
import {selectCurrentUser} from "../../../store/user/user.selectors";
// import CustomBreadcrumbs from '../../../components/Breadcrumbs/Breadcrumbs.component';

function ArticleDetails() {

  const {role} = useSelector(selectCurrentUser);

    let { slug } = useParams();
    const [article,setArticle] = useState(null);
    const [loading,setLoading] = useState(true);

    useEffect(() => {
        (async () => {
            const {data : res} = await getArticleBySLug(slug);
            const {article} = res.data;
            setArticle(article);
            setLoading(false);
        })();
    },[]);

    if(loading){
        return <Loading />
    }

    if(!article){
        return <h3>aucun article trouvé</h3>
    }

    // const parsedContent = matter("# salut");

  return (
    <div className='article__details'>

        {/* <CustomBreadcrumbs /> */}
        {/* <div>{article.content}</div> */}
        <div className='flex-between'>
            <div className='date'>posté le {moment(article.createdAt).format("YYYY/MM/DD kk:mm:ss")}</div>
            {role === "admin" && (<Button nomargin fitContent><EditIcon />Modifier</Button>)}
            
        </div>
        <h1>{article.title}</h1>
        <div className='content'>
            <ReactMarkdown children={article.content} remarkPlugins={[remarkGfm]} />
        </div>
    </div>
  )
}

export default ArticleDetails