import { EditorState } from "draft-js";
import Draft, { htmlToDraft, draftToHtml, EmptyState, rawToDraft, draftToRaw , draftStateToHTML} from 'react-wysiwyg-typescript';

export interface Section{
    id?: string;
    section_name: string;
    content: Draft.RawDraftContentState;
    blog_id: string;
};