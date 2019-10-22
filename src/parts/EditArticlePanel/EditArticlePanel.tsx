import * as React from 'react';
import { MouseEvent, FormEvent } from 'react';
import { Redirect } from 'react-router-dom';

import sanitizeHtml from 'sanitize-html';

import {
    validArticleUrlId,
    validArticleTitle,
    validArticleDescription,
    validArticleContent,
    sanitizeArticleContent,
    convertToMarkdown,
    convertArticleContentToHtml,
    loadTwitterWidgets,
    loadHighlightJs
} from '../../util';

import {
    getArticleDataById,
    updateArticleData,
    postNewArticle
} from '../ApiCaller/ApiCaller';

import {
    IPostArticleDataQuery,
    IUpdateArticleDataQuery
} from '../ApiCaller/ApiCaller.d';

import { getSubKey, isMegaSub } from '../../subdomains';

import "./EditArticlePanel.css";

export enum EditorModes {
    MD,
    HTML
}



interface IEditArticlePanelProps {
    editorMode?: EditorModes;
    match: {
        params: {
            articleId: string | null;
        }
    };
};


interface IEditArticlePanelState {
    editorMode: EditorModes;

    articleContentInputText: string;

    articleId: string | null;
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

    newArticleSuccess: boolean;
    submitButtonRef: React.RefObject<HTMLButtonElement>;
};


export default class EditArticlePanel extends React.Component<IEditArticlePanelProps, IEditArticlePanelState> {
    constructor(props: IEditArticlePanelProps) {
        super(props);

        let { editorMode } = props;
        let { articleId } = props.match.params;
        if (articleId === undefined) {
            // new article
            articleId = null;
        }
        if (editorMode === undefined) {
            editorMode = EditorModes.HTML;
        }

        this.state = {
            editorMode,
            articleContentInputText: '',

            articleId,

            articleUrlId: '',
            articleTitle: '',
            articleDescription: '',
            articleContent: '',

            urlIdError: '',
            titleError: '',
            descriptionError: '',
            contentError: '',

            submitError: '',
            successfulSubmit: false,
            newArticleSuccess: false,

            submitButtonRef: React.createRef()
        };

        this.newArticle = this.newArticle.bind(this);
        this.changedUrlId = this.changedUrlId.bind(this);
        this.changedTitle = this.changedTitle.bind(this);
        this.changedDescription = this.changedDescription.bind(this);
        this.changedContentInput = this.changedContentInput.bind(this);
        this.setPreviewHTML = this.setPreviewHTML.bind(this);
        this.clickSubmit = this.clickSubmit.bind(this);
        this.resetErrorMessages = this.resetErrorMessages.bind(this);
        this.saveKeydown = this.saveKeydown.bind(this);
        this.updateContent = this.updateContent.bind(this);
    }

    public componentDidMount() {
        if (!this.newArticle()) {
            getArticleDataById(this.state.articleId!)
                .then(({ data: resData }) => {
                    const data = resData.data;
                    const { err } = resData;
                    if (err) {
                        this.setState({
                            submitError: err
                        })
                        return;
                    }
                    const { editorMode } = this.state;
                    let articleContentInputText = '';
                    if (editorMode === EditorModes.HTML) {
                        articleContentInputText = data.articleContent;
                    } else if (editorMode === EditorModes.MD) {
                        articleContentInputText = convertToMarkdown(data.articleContent);
                    }
                    this.setState({
                        articleContentInputText: articleContentInputText
                    })
                    this.setState({

                        articleUrlId: data.articleUrlId,
                        articleTitle: data.articleTitle,
                        articleDescription: data.articleDescription,
                        articleContent: data.articleContent,

                        urlIdError: '',
                        titleError: '',
                        descriptionError: '',
                        contentError: '',

                        submitError: '',
                        successfulSubmit: false
                    });

                })
                .catch((err) => {
                    this.setState({
                        // putting FETCH ERROR here
                        submitError: err.message
                    })
                });
        }

        // Save Hotkey Listener - SET
        document.addEventListener("keydown", this.saveKeydown);
    }

    public componentWillUnmount() {
        // Save Hotkey Listener - REMOVE
        document.removeEventListener("keydown", this.saveKeydown);
    }

    public componentDidUpdate() {
        loadTwitterWidgets();
        loadHighlightJs();
    }

    public newArticle(): boolean {
        // checks if the article is new (POST) or existing (PUT)
        return this.state.articleId === null;
    }

    public changedUrlId(e: FormEvent<HTMLInputElement>) {
        const newUrlId: string = e.currentTarget.value;
        const validation = validArticleUrlId(newUrlId)

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
        const validation = validArticleTitle(newTitle);

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
        const validation = validArticleDescription(newDescription);
        
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

    private updateContent(newArticleContentInputText: string): void {
        const { editorMode } = this.state;
        this.setState({
            articleContentInputText: newArticleContentInputText
        });
        if (editorMode === EditorModes.MD) {
            this.setState({
                // TODO: convert
                articleContent: convertArticleContentToHtml(newArticleContentInputText)
            });
        } else if (editorMode === EditorModes.HTML) {
            this.setState({
                articleContent: newArticleContentInputText
            })
        }
    }

    public changedContentInput(e: FormEvent<HTMLTextAreaElement>) {
        const newArticleContentInputText = e.currentTarget.value;
        this.updateContent(newArticleContentInputText);
        /*this.setState({
            articleContentInputText: newArticleContentInputText
        });
        if (editorMode === EditorModes.MD) {
            this.setState({
                articleContent: newEditorContentBoxText
            });
        } else if (editorMode === EditorModes.HTML) {
            this.setState({
                articleContent: newArticleContentInputText
            })
        }*/
    }
    
    public setPreviewHTML() {
        const { articleContent, articleTitle } = this.state;
        const title = sanitizeHtml(articleTitle, { allowedTags: [] });
        const content = sanitizeArticleContent(articleContent);
        return { __html: `<h1 style="margin: 2px 0px;">${title}</h1><div>${content}</div>` }
    }

    public resetErrorMessages(resetTime=3000) {
        setTimeout(() => {
                this.setState({
                    successfulSubmit: false,
                    submitError: '',
                    urlIdError: '',
                    titleError: '',
                    descriptionError: '',
                    contentError: ''
                });
            }, resetTime);
    }

    public clickSubmit(e: MouseEvent<HTMLButtonElement>) {
        e.preventDefault();

        const {
           articleUrlId,
           articleTitle,
           articleDescription,
           articleContent
        } = this.state;

        const urlIdVal = validArticleUrlId(articleUrlId);
        const titleVal = validArticleTitle(articleTitle);
        const descriptionVal = validArticleDescription(articleDescription);
        const contentVal = validArticleContent(articleContent);

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
            // Valid fields.  Attempting PUT or POST
            const articleSub = getSubKey();
            if(this.newArticle()) {
                const newArticleData: IPostArticleDataQuery = {
                    articleSub,
                    articleUrlId,
                    articleTitle,
                    articleDescription,
                    articleContent
                }
                if (isMegaSub(articleSub)) {
                    // TODO: what to do if mega sub?
                    this.setState({
                        successfulSubmit: false,
                        submitError: "Can't do this in master!"
                    })
                }
                postNewArticle(newArticleData)
                    .then(({ data: resData }) => {
                        const { err, data } = resData;
                        if (err !== null) {
                            this.setState({
                                submitError: err
                            })
                            return;
                        } else {
                            this.setState({
                                submitError: 'Article created!: ' + JSON.stringify(data),
                                articleId: data.articleId,
                                successfulSubmit: true,
                                newArticleSuccess: true
                            })
                        }
                    })
                    .catch((err) => {
                        this.setState({
                            submitError: err
                        })
                    })
            } else {
                const updatedArticleData: IUpdateArticleDataQuery = {
                    articleUrlId,
                    articleTitle,
                    articleDescription,
                    articleContent
                }
                updateArticleData(this.state.articleId!, updatedArticleData)
                    .then(({ data: resData }) => {
                        const { success, err } = resData;
                        if (!success) {
                            this.setState({
                                submitError: err!
                            })
                            return;
                        } else {
                            this.setState({
                                submitError: 'Article Updated!',
                                successfulSubmit: true
                            })
                        }
                    })
            }

            // waits a moment, then resets error messages
            this.resetErrorMessages();
        }
    }

    private saveKeydown(e: KeyboardEvent) {
        // Checks for Ctrl + S or Meta + S and saves
        if ((e.ctrlKey || e.metaKey) && (e.key === 's')) {
            e.preventDefault();
            if (this.state.submitButtonRef.current) {
                this.state.submitButtonRef.current.click();
            }
        }
    }

    public render() {
        if (this.state.newArticleSuccess && this.state.articleId) {
            // If a new article has been created, it redirects to the Edit URL
            return <Redirect to={"/editor/edit/" + this.state.articleId} />
        }
        const { editorMode } = this.state;
        let contentInputSectionTitleSuffix;
        if (editorMode === EditorModes.MD) {
            contentInputSectionTitleSuffix = "(Markdown)";
        } else if (editorMode === EditorModes.HTML) {
            contentInputSectionTitleSuffix = "(Raw HTML)";
        }

        return (
            <div className="edit-article-panel item-box">
                <form>
                    <div>
                        <h1 className="edit-article-panel__header">{this.newArticle() ? 'New' : 'Edit'} Article</h1>
                    </div>
                    <h2 className="" style={{ fontFamily: "Lato, sans-serif", color: this.state.successfulSubmit ? "green": "red" }}>{this.state.submitError}</h2>
                    <div>
                        <h3 className="edit-article-panel__form-label">URL ID (unique, hyphens instead of spaces)</h3>
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
                        <h3 className="edit-article-panel__form-label">Content {contentInputSectionTitleSuffix}</h3>
                        <p className="edit-article-panel__field-error">{this.state.contentError}</p>
                        <textarea className="edit-article-panel__content edit-article-panel__input edit-article-panel__textarea" onChange={this.changedContentInput} value={this.state.articleContentInputText} />
                    </div>
                    <button
                        onClick={this.clickSubmit}
                        className="edit-article-panel__submit-button"
                        ref={this.state.submitButtonRef}
                    >
                        {this.newArticle() ? 'CREATE' : 'UPDATE'}
                    </button>
                    
                    <div>
                        <h3 className="edit-article-panel__form-label">Preview</h3>
                        <div className="edit-article-panel__content-preview" dangerouslySetInnerHTML={this.setPreviewHTML()}/>
                    </div>
                </form>
            </div>
        );
    }
}
