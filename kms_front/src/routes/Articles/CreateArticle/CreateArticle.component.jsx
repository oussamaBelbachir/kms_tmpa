import React ,{useState} from 'react'
import "./CreateArticle.styles.scss";
import Button from '../../../components/Button/button.component';
import FormInput from '../../../components/FormInput/FormInput.component';
import Label from '../../../components/Label/Label.component';
import {createArticle} from "../../../Api/articles";
import { toast } from 'react-hot-toast';
import Editor from '../../../components/Editor2/Editor';
import TurndownService from "turndown";

function CreateArticle() {

    const direction_departments = JSON.parse(import.meta.env.VITE_DIRECTION_DEPARTMENTS);
    
    const [direction,setDirection] = useState("");
    const [department,setDepartment] = useState("");
    const [title,setTitle] = useState("");
    const [description,setDescription] = useState("");
    const [content,setContent] = useState("");
    const [loading,setLoading] = useState(false);
    const [image, setImage] = useState(null)
    const [showImage, setShowImage] = useState(null)

    const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
         
        const file = event.target.files[0];
        // console.log(file);
        setImage(file);

        setShowImage(URL.createObjectURL(event.target.files[0]));
    }
    }
    const getDepartmentsByDirection = () => {
        if(!direction) return [];
        return direction_departments[direction].map(dir => ({value : dir,text : dir}));
    }

    const handleSubmit = async e => {
        e.preventDefault();

        if(!department || !direction || !title || !content || !description)
            return toast.error("Remplissez tous les champs !");

        setLoading(true);

        const formData = new FormData();
        formData.append("direction",direction);
        formData.append("department",department);
        formData.append("description",description);
        formData.append("image",image);
        formData.append("title",title);
        formData.append("content",markdownContent);
         
        try{
            const {data : res} = await createArticle(formData);
 
            console.log(res);
            toast.success(res.message);
            setDirection("");
            setDepartment("");
            setTitle("");
            // setContent("");
            // navigate("/articles");

        }catch(err){
            console.log("Err ==> ",err);
            toast.error("Error ❌ ❌ ❌");
        }

        setLoading(false);

    }

    const turndownService = new TurndownService();
    const markdownContent = turndownService.turndown(content);
 

  return (
    <div className='create__article'>
        <form onSubmit={handleSubmit}>


        {/* ========================================== */}
        
        <Label required>Image</Label>

        <div className='upload__image'>
            <label htmlFor="images" className="drop-container" id="dropcontainer">
                <input 
                    name="image" 
                    type="file" 
                    onChange={onImageChange} 
                    id="images" 
                    accept="image/*" 
                    required 
                    encType="multipart/form-data"
                />
            </label>
            {/* ========================================== */}
            {showImage && (<div className='image__preview'><img src={showImage} alt={"preview"}/></div>)}
            {/* <img src={"http://localhost:8000/uploads/70b9766f85a696b5dd81a2adba3b19af"}/> */}
        
        </div>
        

            <FormInput 
                label={"Direction"}
                name='direction'
                required
                defaultOption="Veuillez choisir la direction "
                values={Object.keys(direction_departments).map(dir => ({value : dir,text : dir}))}
                value={direction}
                onChange={(e) => { setDirection(e.target.value)}}
            />

            <FormInput 
                label={"Département"}
                name='department'
                required
                defaultOption="Veuillez choisir le département "
                values={getDepartmentsByDirection()}
                value={department}
                onChange={(e) => { setDepartment(e.target.value)}}
            />

            <FormInput 
                label={"Titre"}
                placeholder=""
                type='text'
                name='title'
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
            />    

            <FormInput 
                label={"Description"}
                placeholder=""
                type='text'
                name='description'
                required
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />    

            <div>
                <Label required>Contenu</Label>
 
                <Editor
                    value={content}
                    setValue={(v) => setContent(v)}
                />
                {/* <Editor 
                    value={content}
                    setValue={(value) => setContent(value)}
                /> */}
            </div>

            <Button width={200} loading={loading}>Ajouter</Button>
        </form>

        {/* <div>
        <h1>React Quill Editor with full toolbar options and custom buttons (undo &amp; redo)</h1><p><a href="https://medium.com/@mircea.calugaru?source=post_page-----176d79f8d375--------------------------------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit', backgroundColor: 'rgb(242, 242, 242)'}}><img src="https://miro.medium.com/v2/resize:fill:88:88/2*4diGcLLBnOuZ8XJ8yfePiQ.png" /></a></p><p><a href="https://medium.com/@mircea.calugaru?source=post_page-----176d79f8d375--------------------------------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>Mike Calugaru</a></p><p><br /></p><p><br /></p><p><a href="https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D176d79f8d375&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40mircea.calugaru%2Freact-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375&source=-----176d79f8d375---------------------post_audio_button-----------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit', backgroundColor: 'rgb(255, 255, 255)'}}><img src="https://miro.medium.com/v2/resize:fit:1400/1*Orexv5GDZPk8a8ejXyptVQ.png" /></a></p><p><a href="https://medium.com/m/signin?actionUrl=https%3A%2F%2Fmedium.com%2Fplans%3Fdimension%3Dpost_audio_button%26postId%3D176d79f8d375&operation=register&redirect=https%3A%2F%2Fmedium.com%2F%40mircea.calugaru%2Freact-quill-editor-with-full-toolbar-options-and-custom-buttons-undo-redo-176d79f8d375&source=-----176d79f8d375---------------------post_audio_button-----------" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>This article shows one way to set up&nbsp;</a><a href="https://quilljs.com/" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}><em>Quill</em></a>&nbsp;editor within the React framework with the full spectrum of standard toolbar options as well as 2 extra common but custom buttons: Undo and Redo.</p><p><strong>Quick backstory:</strong>&nbsp;some time ago I was looking for a free&nbsp;<a href="https://en.wikipedia.org/wiki/WYSIWYG" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}><em>WYSIWYG web editor</em></a>to integrate it in my React app. I decided to stop on Quill (though there are loads more free editors out there) and was searching for examples on how to set it up with a custom toolbar and make it work as a React component. The best and almost working example that I could find was&nbsp;<a href="https://codesandbox.io/s/6x93pk4rp3?file=%2Findex.js" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>https://codesandbox.io/s/6x93pk4rp3?file=/index.js</a>&nbsp;from&nbsp;<a href="https://codesandbox.io/u/miukimiu" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}><em>Elizabet Oliveira</em></a>back in 2018. This article builds on top of Elizabet’s example with the extra of bug fixes, up-to-date React hooks, custom Redo and Undo buttons, as well as a display of all of Quill’s standard toolbar options (that I could find). It was a bit of a hassle to make all the elements to work properly (without any errors and warnings), so hopefully this will save you off from some possible pain. Enjoy!</p><p>CodeSandBox:&nbsp;<a href="https://codesandbox.io/s/react-quill-full-toolbar-j569z" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>https://codesandbox.io/s/react-quill-full-toolbar-j569z</a></p><p>Live demo:&nbsp;<a href="https://j569z.csb.app/" rel="noopener noreferrer" target="_blank" style={{color: 'inherit'}}>https://j569z.csb.app/</a></p><p>I would recommend that you split the code into 2 files:&nbsp;<em>EditorToolbar.js —&nbsp;</em>keep the toolbar component and associated stuff, and&nbsp;<em>Editor.js —&nbsp;</em>the editor component.</p><p><em>EditorToolbar.js</em></p>
      </div> */}

      {/* <div>{content}</div>

    <div>{markdownContent}</div> */}

 
{/* <hr/>
<hr/>
<hr/>
<hr/>
<hr/> */}
      {/* <ReactMarkdown children={markdownContent} remarkPlugins={[remarkGfm]} /> */}
    </div>
  )
}

export default CreateArticle