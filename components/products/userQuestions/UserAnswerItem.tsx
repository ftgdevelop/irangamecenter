/* eslint-disable  @typescript-eslint/no-explicit-any */

import UserCircle from "../../icons/UserCircle";
import { AnswerItemType } from "@/types/commerce";
import LikeAndDislike from "./LikeAndDislike";
import { dateDisplayFormat } from "@/helpers";

type Props = {
    questionId: number;
    answer:AnswerItemType;
    inBox?: boolean;
};

const UserAnswerItem: React.FC<Props> = props => {

    const {answer} = props;

    if(props.inBox){
        return(
            <div className="bg-neutral-100 dark:bg-[#192a39] border border-neutral-200 dark:border-white/15 rounded-xl p-2.5 ml-1.5 relative mb-2">
                <div className="flex gap-2 items-center mb-3">                    
                    <UserCircle className="shrink-0 w-6 h-6 fill-current" />
                    <div className="text-xs"> {answer.userDisplayName || "کاربر مرکز بازی ایران"}  </div>
                </div>
                                
                <div className="text-xs">
                    
                    <div className="mb-3 text-justify"> {answer.answerText?.slice(0,100)} {answer.answerText?.length && answer.answerText.length > 100 ? "...": null} </div>

                    <div className="flex justify-between items-center gap-4 pointer-events-none" >
                        
                        <div>
                            {answer.creationTime ? dateDisplayFormat({
                                date:answer.creationTime,
                                format:"dd mm yyyy",
                                locale:"fa"
                            }) : null} 
                        </div>

                        <LikeAndDislike
                            answerId={props.answer.id}
                            questionId={props.questionId}
                            dislikeCount={answer.dislikeCount}
                            likeCount={answer.likeCount}
                            // TODO
                            initiallyLiked={false}
                            initiallyDisLiked={false}                         
                         />
                    </div>
                </div>            
            </div> 
        )
    }

    return (
        <div className="flex gap-2 mb-5">                                
                
                <UserCircle className="shrink-0 w-6 h-6 fill-current" />
                
                <div className="grow text-xs">
                    <div className="mt-1 mb-2"> {answer.userDisplayName || "کاربر مرکز بازی ایران"}  </div>
                    <div className="mb-2 text-sm"> {answer.answerText} </div>
                    <div className="flex justify-between items-center gap-4" >
                        
                        <div> 
                            {answer.creationTime ? dateDisplayFormat({
                                date:answer.creationTime,
                                format:"dd mm yyyy",
                                locale:"fa"
                            }) : null} 
                        </div>

                        <LikeAndDislike
                            answerId={props.answer.id}
                            questionId={props.questionId}
                            dislikeCount={answer.dislikeCount}
                            likeCount={answer.likeCount}
                            // TODO
                            initiallyLiked={false}
                            initiallyDisLiked={false}                         
                         />
                    </div>
                </div>
            
        </div>
    )
}

export default UserAnswerItem;
