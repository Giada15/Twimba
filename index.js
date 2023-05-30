let tweetsData = [   
    {
        handle: `@TrollBot66756542 💎`,
        profilePic: `images/troll.jpg`,
        likes: 27,
        retweets: 10,
        tweetText: `Buy Bitcoin, ETH Make 💰💰💰 low low prices. 
            Guaranteed return on investment. HMU DMs open!!`,
        replies: [],
        isLiked: false,
        isRetweeted: false,
        uuid: '4b161eee-c0f5-4545-9c4b-8562944223ee',
    },    
    {
        handle: `@Elon ✅`,
        profilePic: `images/musk.png`,
        likes: 6500,
        retweets: 234,
        tweetText: `I need volunteers for a one-way mission to Mars 🪐. No experience necessary🚀`,
        replies: [
                  {
                handle: `@TomCruise ✅`,
                profilePic: `images/tcruise.png`,
                tweetText: `Yes! Sign me up! 😎🛩`,
            },
                  {
                handle: `@ChuckNorris ✅`,
                profilePic: `images/chucknorris.jpeg`,
                tweetText: `I went last year😴`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '3c23454ee-c0f5-9g9g-9c4b-77835tgs2',
    },
        {
        handle: `@NoobCoder12`,
        profilePic: `images/flower.png`,
        likes: 10,
        retweets: 3,
        tweetText: `Are you a coder if you only know HTML?`,
        replies: [
            {
                handle: `@StackOverflower ☣️`,
                profilePic: `images/overflow.png`,
                tweetText: `No. Obviosuly not. Go get a job in McDonald's.`,
            },
            {
                handle: `@YummyCoder64`,
                profilePic: `images/love.png`,
                tweetText: `You are wonderful just as you are! ❤️`,
            },
        ],
        isLiked: false,
        isRetweeted: false,
        uuid: '8hy671sff-c0f5-4545-9c4b-1237gyys45',
    },     
]

// import { tweetsData } from './data.js'
import { v4 as uuidv4 } from 'https://jspm.dev/uuid';

// localStorage.clear()

// Render values stored in the localStorage
getValuesFromLocalStorage()

function getValuesFromLocalStorage(){

    let tweetsDataFromLocalStorage = JSON.parse(localStorage.getItem("tweetsArray"))

    if(tweetsDataFromLocalStorage){
        tweetsData=tweetsDataFromLocalStorage
    }
   
    tweetsData.forEach(function(tweet){
        let likesFromLocalStorage= JSON.parse(localStorage.getItem(`likes-${tweet.uuid}`))

        let isLikedfromLocalStorage = JSON.parse(localStorage.getItem(`isLiked-${tweet.uuid}`))

        let retweetsFromLocalStorage = JSON.parse(localStorage.getItem(`retweets-${tweet.uuid}`))

        let isRetweetedFromLocalStorage = JSON.parse(localStorage.getItem(`isRetweeted-${tweet.uuid}`))

        if(likesFromLocalStorage && isLikedfromLocalStorage){
            tweet.likes= likesFromLocalStorage
            tweet.isLiked = isLikedfromLocalStorage
        }

        if(retweetsFromLocalStorage && isRetweetedFromLocalStorage){
            tweet.retweets = retweetsFromLocalStorage
            tweet.isRetweeted = isRetweetedFromLocalStorage
        }

    })

    render()   

}

document.addEventListener('click', function(e){
    if(e.target.dataset.like){
        handleLikeClick(e.target.dataset.like) 
    }
    else if(e.target.dataset.retweet){
        handleRetweetClick(e.target.dataset.retweet)
    }
    else if(e.target.dataset.reply){
        handleReplyClick(e.target.dataset.reply)
    }
    else if(e.target.id === 'tweet-btn'){
        handleTweetBtnClick()
    }
    else if(e.target.dataset.comment){
        handleReplyBtnClick(e.target.dataset.comment) 
    }
    else if(e.target.dataset.delete){
        handleDeleteClick(e.target.dataset.delete)
    }
})
 
function handleLikeClick(tweetId){ 
    
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]

    if (targetTweetObj.isLiked){
        targetTweetObj.likes--
        //isLiked=false
    }
    else{
        targetTweetObj.likes++ 
        //isLiked=true
    }
    
    targetTweetObj.isLiked = !targetTweetObj.isLiked

    render()

    // Save both likes and booleans' values to  the local Storage
    localStorage.setItem(`likes-${tweetId}`, JSON.stringify(targetTweetObj.likes))

    localStorage.setItem(`isLiked-${tweetId}`, JSON.stringify(targetTweetObj.isLiked)) 

}

function handleRetweetClick(tweetId){
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid === tweetId
    })[0]
    
    if(targetTweetObj.isRetweeted){
        targetTweetObj.retweets--
    }
    else{
        targetTweetObj.retweets++
    }
    targetTweetObj.isRetweeted = !targetTweetObj.isRetweeted
    render() 

    // Save both likes and booleans values to local Storage
    localStorage.setItem(`retweets-${tweetId}`, JSON.stringify(targetTweetObj.retweets))

    localStorage.setItem(`isRetweeted-${tweetId}`, JSON.stringify(targetTweetObj.isRetweeted))

}

function handleReplyClick(replyId){
    document.getElementById(`replies-${replyId}`).classList.toggle('hidden')
}

function handleTweetBtnClick(){
    const tweetInput = document.getElementById('tweet-input')

    if(tweetInput.value){
        tweetsData.unshift({
            handle: `@Giada`,
            profilePic: `images/scrimbalogo.png`,
            likes: 0,
            retweets: 0,
            tweetText: tweetInput.value,
            replies: [],
            isLiked: false,
            isRetweeted: false,
            uuid: uuidv4(),
        })
    render()
    tweetInput.value = ''
    }

    // Save the updated tweetsData array to the local storage
    localStorage.setItem("tweetsArray", JSON.stringify(tweetsData))

}

function handleDeleteClick(deleteId){
    //Following code not necessary because I delete the tweet from the weetsData array below
    //document.querySelector(`#delete-${deleteId}`).classList.add("hidden")

    tweetsData = tweetsData.filter(function (tweet){
        return tweet.uuid !== deleteId
    })

    render()

    //Update local storage with the updated tweetsData array
    localStorage.setItem("tweetsArray", JSON.stringify(tweetsData))

}

function handleReplyBtnClick(tweetId){
    const replyInput= document.getElementById(`response-${tweetId}`)
    const targetTweetObj = tweetsData.filter(function(tweet){
        return tweet.uuid===tweetId
    })[0]
    

    if(replyInput.value){
        targetTweetObj.replies.unshift(
            {
                handle: `@Giada`,
                profilePic: `images/scrimbalogo.png`,
                tweetText: replyInput.value
            })


        render()

        document.getElementById(`replies-${tweetId}`).classList.remove('hidden')  

    } 

       
}


function getFeedHtml(){
    let feedHtml = ``
    
    tweetsData.forEach(function(tweet){

        //The following lines were replaced with ternaries inside the template literals
        // let likeIconClass = ''
        // if (tweet.isLiked){
        //     likeIconClass = 'liked'
        // }
        // let retweetIconClass = ''
        // if (tweet.isRetweeted){
        //     retweetIconClass = 'retweeted'
        // }

        
        let repliesHtml =``
 
        if(tweet.replies.length > 0){
            tweet.replies.forEach(function(reply){
                repliesHtml+=
                    `<div class="tweet-reply">
                        <div class="tweet-inner">
                            <img src="${reply.profilePic}" class="profile-pic">
                                <div>
                                    <p class="handle">${reply.handle}</p>
                                    <p class="tweet-text">${reply.tweetText}</p>
                                </div>
                        </div>
                    </div>
                    `
            })
        }
        
          
        feedHtml += 
            `<div class="tweet" id="delete-${tweet.uuid}">
                <div class="tweet-inner">
                    <img src="${tweet.profilePic}" class="profile-pic">
                    <div>
                        <p class="handle">${tweet.handle}</p>
                        <p class="tweet-text">${tweet.tweetText}</p>
                        <div class="tweet-details">
                            <span class="tweet-detail">
                                <i class="fa-regular fa-comment-dots"
                                data-reply="${tweet.uuid}"
                                ></i>
                                ${tweet.replies.length}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-heart ${tweet.isLiked ? 'liked' : ''}"
                                data-like="${tweet.uuid}"
                                ></i>
                                ${tweet.likes}
                            </span>
                            <span class="tweet-detail">
                                <i class="fa-solid fa-retweet ${tweet.isRetweeted ? 'retweeted' : ''}"
                                data-retweet="${tweet.uuid}"
                                ></i>
                                ${tweet.retweets}
                            </span>
                            ${tweet.handle === "@Giada" ? `
                                <span class="tweet-delete">
                                    <i class="fa-solid fa-trash"
                                    data-delete="${tweet.uuid}"
                                    ></i>
                                </span> ` : ""}
                        </div>   
                    </div>            
                </div>
                
            <div class="hidden" id="replies-${tweet.uuid}">
                <div class="tweet-reply tweet-comment" id="reply-${tweet.uuid}">
                    <div class="tweet-inner">
                        <img src="images/scrimbalogo.png" class="profile-pic">
                        <div class="reply">
                            <p class="handle">@Giada</p>    
                            <textarea class="reply-input" id="response-${tweet.uuid}"></textarea>    
                            <button class="reply-btn" data-comment="${tweet.uuid}">Reply</button>
                        </div>
                    </div>
                </div>
                ${repliesHtml}
            </div>   
            </div>
            `
   })


   return feedHtml 
}




function render(){
    document.getElementById('feed').innerHTML = getFeedHtml()
}

render()


//SOME NOTES
// problem 1: all REPLY buttons are connected to the first input
// Solution 1: give a unique id to the text box (otherwise every text box created will have the same id)
// and the one taken in consideration when I hit any reply button is the first one.

//PROBLEMS
//I was not able to find a way to reassign the value of the tweetsData array in data.js
//so I pasted tweetsData here again