import * as React from 'react';

import * as sanitizeHtml from 'sanitize-html';

import {
    IArticleFieldValidationResponse,
    validArticleUrlId,
    validArticleTitle,
    validArticleDescription,
    validArticleContent,
    sanitizeArticleContent
} from '../../util';

import { defaultTheme as theme } from '../../style/themes';
import "./EditArticlePanel.css";

const editArticlePanelStyle = theme.itemBoxStyle;

interface IEditArticlePanelProps {
  initialArticleUrlId: string | null;
};


interface IEditArticlePanelState {
    initialArticleUrlId: string | null;

    articleUrlId: string;
    articleTitle: string;
    articleDescription: string;
    articleContent: string;

    urlIdError: string;
    titleError: string;
    descriptionError: string;
    contentError: string;
};

interface IEventDummy {
    target: {
        value: string
    }
}


export default class EditArticlePanel extends React.Component<IEditArticlePanelProps, IEditArticlePanelState> {
    constructor(props: IEditArticlePanelProps) {
        super(props);

        const { initialArticleUrlId } = props;

        this.state = {
            initialArticleUrlId,

            articleUrlId: (initialArticleUrlId !== null) ? initialArticleUrlId : '',
            articleTitle: '',
            articleDescription: '',
            articleContent: '',

            urlIdError: '',
            titleError: '',
            descriptionError: '',
            contentError: ''
        };

        this.changedUrlId = this.changedUrlId.bind(this);
        this.changedTitle = this.changedTitle.bind(this);
        this.changedDescription = this.changedDescription.bind(this);
        this.changedContent = this.changedContent.bind(this);
        this.setPreviewHTML = this.setPreviewHTML.bind(this);

    }

    public componentDidMount() {
        if (this.props.initialArticleUrlId !== null) {
            //TODO: set input box initial values (for exixting article, indicated by non-null initialArticleUrlId)
        }
    }

    public changedUrlId(e: IEventDummy) {
        const newUrlId: string = e.target.value;
        const validation: IArticleFieldValidationResponse = validArticleUrlId(newUrlId)

        this.setState({
            articleUrlId: newUrlId
        });
        
        if (!validation.valid) {
            this.setState({
                urlIdError: validation.err
            })
        } else {
            this.setState({
                urlIdError: ""
            })
        }
    }

    public changedTitle(e: IEventDummy) {
        const newTitle: string = e.target.value;
        const validation: IArticleFieldValidationResponse = validArticleTitle(newTitle);

        this.setState({
            articleTitle: newTitle
        });

        if (!validation.valid) {
            this.setState({
                titleError: validation.err
            })
        } else {
            this.setState({
                titleError: ""
            })
        }
    }

    public changedDescription(e: IEventDummy) {
        const newDescription: string = e.target.value;
        const validation: IArticleFieldValidationResponse = validArticleDescription(newDescription);
        
        this.setState({
            articleDescription: newDescription
        });

        if (!validation.valid) {
            this.setState({
                descriptionError: validation.err
            })
        } else {
            this.setState({
                descriptionError: ""
            })
        }
    }

    public changedContent(e: IEventDummy) {
        const newContent: string = e.target.value;
        const validation: IArticleFieldValidationResponse = validArticleContent(newContent);

        this.setState({
            articleContent: newContent
        });

        if (!validation.valid) {
            this.setState({
                contentError: validation.err
            })
        } else {
            this.setState({
                contentError: ""
            })
        }
    }
    
    public setPreviewHTML() {
        const title = sanitizeHtml(this.state.articleTitle, { allowedTags: [] });
        const content = sanitizeArticleContent(this.state.articleContent);

        return { __html: `<h1>${title}</h1><div>${content}</div>` }
    }

    public render() {
        return (
            <div className="edit-article-panel" style={editArticlePanelStyle}>
                <form>
                    <div>
                        <h1 className="edit-article-panel__header">{this.state.articleUrlId ? 'Edit' : 'New'} Article</h1>
                    </div>
                    <div>
                        <h3 className="edit-article-panel__form-label">URL ID (unique, hyphens instead of spaces</h3>
                        <p className="edit-article-panel__field-error">{this.state.urlIdError}</p>
                        <input className="edit-article-panel__url-id edit-article-panel__input" type="text" onChange={this.changedUrlId} />
                    </div>

                    <div>
                        <h3 className="edit-article-panel__form-label">Title</h3>
                        <p className="edit-article-panel__field-error">{this.state.titleError}</p>
                        <input className="edit-article-panel__title edit-article-panel__input" type="text" onChange={this.changedTitle} />
                    </div>
                    
                    <div>
                        <h3 className="edit-article-panel__form-label">Description</h3>
                        <p className="edit-article-panel__field-error">{this.state.descriptionError}</p>
                        <input className="edit-article-panel__description edit-article-panel__input" type="text" onChange={this.changedDescription} />
                    </div>
                    
                    <div>
                        <h3 className="edit-article-panel__form-label">Content (Raw HTML)</h3>
                        <p className="edit-article-panel__field-error">{this.state.contentError}</p>
                        <textarea className="edit-article-panel__content edit-article-panel__input edit-article-panel__textarea" onChange={this.changedContent}/>
                    </div>
                    
                    <div>
                        <h3 className="edit-article-panel__form-label">Content Preview (Rendered)</h3>
                        <div className="edit-article-panel__content-preview" dangerouslySetInnerHTML={this.setPreviewHTML()}/>
                    </div>
                </form>
            </div>
        );
    }
}
