import * as React from 'react';
import { MouseEvent, FormEvent } from 'react';

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
    initialArticleId: string | null;
};


interface IEditArticlePanelState {
    initialArticleId: string | null;

    articleId: string;
    articleUrlId: string;
    articleTitle: string;
    articleDescription: string;
    articleContent: string;

    urlIdError: string;
    titleError: string;
    descriptionError: string;
    contentError: string;

    submitError: string;
    successfulSubmit: boolean;
};


export default class EditArticlePanel extends React.Component<IEditArticlePanelProps, IEditArticlePanelState> {
    constructor(props: IEditArticlePanelProps) {
        super(props);

        const { initialArticleId } = props;

        this.state = {
            initialArticleId,

            articleId: (initialArticleId !== null) ? initialArticleId : '',
            articleUrlId: '',
            articleTitle: '',
            articleDescription: '',
            articleContent: '',

            urlIdError: '',
            titleError: '',
            descriptionError: '',
            contentError: '',

            submitError: '',
            successfulSubmit: false
        };

        this.changedUrlId = this.changedUrlId.bind(this);
        this.changedTitle = this.changedTitle.bind(this);
        this.changedDescription = this.changedDescription.bind(this);
        this.changedContent = this.changedContent.bind(this);
        this.setPreviewHTML = this.setPreviewHTML.bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
    }

    public componentDidMount() {
        if (this.props.initialArticleId !== null) {
            //TODO: set input box initial values (for exixting article, indicated by non-null initialArticleId)

            // TODO: fetch article data based on initialArticleId
            // TODO: If data is retrieved, populate existing values in all fields:
            //   
            // TODO: If the article doesn't exist, display error
        }
    }

    public changedUrlId(e: FormEvent<HTMLInputElement>) {
        const newUrlId: string = e.currentTarget.value;
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

    public changedTitle(e: FormEvent<HTMLInputElement>) {
        const newTitle: string = e.currentTarget.value;
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

    public changedDescription(e: FormEvent<HTMLInputElement>) {
        const newDescription: string = e.currentTarget.value;
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

    public changedContent(e: FormEvent<HTMLTextAreaElement>) {
        const newContent: string = e.currentTarget.value;
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

        return { __html: `<h1 style="margin: 2px 0px;">${title}</h1><div>${content}</div>` }
    }

    public clickSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const urlIdVal = validArticleUrlId(this.state.articleUrlId);
        const titleVal = validArticleTitle(this.state.articleTitle);
        const descriptionVal = validArticleDescription(this.state.articleDescription);
        const contentVal = validArticleContent(this.state.articleContent);

        if (!(
            urlIdVal.valid &&
            titleVal.valid &&
            descriptionVal.valid &&
            contentVal.valid
        )) {
            // Failed submit.  Prompt user to fix fields
            this.setState({
                urlIdError: urlIdVal.err,
                titleError: titleVal.err,
                descriptionError: descriptionVal.err,
                contentError: contentVal.err,
                submitError: 'Cannot submit.  Fix fields.'
            });
            return;
        } else {
            // Successful submit
            // TODO: Trigger API call
            // TODO: Trigger initialArticleId change and success/fail error message *based on AJAX success*
            // TODO: Use sanitizeArticleContent on articleContent before submit.
            this.setState(state => ({
                submitError: 'Successful submit!',
                successfulSubmit: true
            }));

            const DEFAULT_ERROR_RESET_WAIT = 2000;  // waits 2 seconds before resetting error messages
            setTimeout(() => {
                this.setState({
                    successfulSubmit: false,
                    submitError: '',
                    urlIdError: '',
                    titleError: '',
                    descriptionError: '',
                    contentError: ''
                });
            }, DEFAULT_ERROR_RESET_WAIT);
        }
    }

    public render() {
        return (
            <div className="edit-article-panel" style={editArticlePanelStyle}>
                <form>
                    <div>
                        <h1 className="edit-article-panel__header">{this.state.initialArticleId ? 'Edit' : 'New'} Article</h1>
                    </div>
                    <h2 className="" style={{ fontFamily: "Lato, sans-serif", color: this.state.successfulSubmit ? "green": "red" }}>{this.state.submitError}</h2>
                    <div>
                        <h3 className="edit-article-panel__form-label">URL ID (unique, hyphens instead of spaces</h3>
                        <p className="edit-article-panel__field-error">{this.state.urlIdError}</p>
                        <input className="edit-article-panel__url-id edit-article-panel__input" type="text" onChange={this.changedUrlId} value={this.state.articleUrlId}/>
                    </div>

                    <div>
                        <h3 className="edit-article-panel__form-label">Title</h3>
                        <p className="edit-article-panel__field-error">{this.state.titleError}</p>
                        <input className="edit-article-panel__title edit-article-panel__input" type="text" onChange={this.changedTitle} value={this.state.articleTitle} />
                    </div>
                    
                    <div>
                        <h3 className="edit-article-panel__form-label">Description</h3>
                        <p className="edit-article-panel__field-error">{this.state.descriptionError}</p>
                        <input className="edit-article-panel__description edit-article-panel__input" type="text" onChange={this.changedDescription} value={this.state.articleDescription} />
                    </div>
                    
                    <div>
                        <h3 className="edit-article-panel__form-label">Content (Raw HTML)</h3>
                        <p className="edit-article-panel__field-error">{this.state.contentError}</p>
                        <textarea className="edit-article-panel__content edit-article-panel__input edit-article-panel__textarea" onChange={this.changedContent} value={this.state.articleContent} />
                    </div>
                    
                    <div>
                        <h3 className="edit-article-panel__form-label">Content Preview (sanitized)</h3>
                        <div className="edit-article-panel__content-preview" dangerouslySetInnerHTML={this.setPreviewHTML()}/>
                    </div>
                    <button onClick={this.clickSubmit} className="edit-article-panel__submit-button">
                        {(this.state.initialArticleId !== null) ? 'UPDATE' : 'CREATE' }
                    </button>
                </form>
            </div>
        );
    }
}
