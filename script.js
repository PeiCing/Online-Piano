// 获取需要的元素
const recordSwitch = document.getElementById('btn1');
const playButton = document.querySelector('.play-button');
const clearButton = document.querySelector('.clear-button');
const whiteKeys = document.querySelectorAll('.white-key');

let recording = false;
let recordedSounds = [];    

//---------------------監聽用鍵盤點擊------------------------------------
document.addEventListener('keydown', function(event) {
    const keyPressed = event.key;        // 获取按下的键值
    const pianoKey = document.querySelector(`[data-key="${keyPressed}"]`);
    if (recording && pianoKey) {
        // 如果在录制中，并且找到了对应的钢琴键，记录点击的音效和延迟时间
        recordedSounds.push({ src: pianoKey.getAttribute('data-src'), delay: 0 });
        pianoKey.classList.add('active');        // 添加下沉效果类
    }
    if (pianoKey) {
        pianoKey.classList.add('active');        // 添加下沉效果类
    }
    
    if (keyPressed !== ';') {
        switch(keyPressed) {
            case 'a':
                playSound('tunes/a.wav');
                break;
            case 'd':
                playSound('tunes/d.wav');
                break;
            case 'e':
                playSound('tunes/e.wav');
                break;
            case 'f':
                playSound('tunes/f.wav');
                break;
            case 'g':
                playSound('tunes/g.wav');
                break;
            case 'h':
                playSound('tunes/h.wav');
                break;
            case 'j':
                playSound('tunes/j.wav');
                break;
            case 'k':
                playSound('tunes/k.wav');
                break;
            case 'l':
                playSound('tunes/l.wav');
                break;
            case 'o':
                playSound('tunes/o.wav');
                break;
            case 'p':
                playSound('tunes/p.wav');
                break;
            case 's':
                playSound('tunes/s.wav');
                break;
            case 't':
                playSound('tunes/t.wav');
                break;
            case 'u':
                playSound('tunes/u.wav');
                break;
            case 'w':
                playSound('tunes/w.wav');
                break;
            case 'y':
                playSound('tunes/y.wav');
                break;
        }
    }else {
        playSound('tunes/;.wav');
    
    }
        // 在播放音频之后稍作延迟，然后移除下沉效果类
        setTimeout(() => {
            if (pianoKey) {
                pianoKey.classList.remove('active');
            }
        }, 200);
});

//----------------------------彈琴------------------------------->  
function playSound(soundFile) {
    var audio = new Audio(soundFile);
    audio.volume = document.querySelector('.player__slider').value; // 设置音频的音量
    audio.play();
}
//--------------------------音量調節------------------------------>
function adjustVolume(volume) {
    const audioElements = document.querySelectorAll('audio'); // 获取所有的音频元素
    audioElements.forEach(audio => {
        audio.volume = volume; // 设置音量
    });
}
//-----------------------------錄製 與 播放_開關鍵------------------------------->      
document.addEventListener("DOMContentLoaded", function() {
    // 点击录制开关
    recordSwitch.addEventListener('change', function() {
        if (this.checked) {
            // 开始录制
            recording = true;
            recordedSounds = []; // 清空录制的音效数组
        } else {
            // 停止录制
            recording = false;
        }
    });

    // 点击播放按钮
    playButton.addEventListener('click', function() {
        console.log(`播放鍵被按下了`);
        // 播放录制的音效
        recordedSounds.forEach((sound, index) => {
            setTimeout(() => {
                playSound(sound.src);
                // 模拟点击琴键的效果
                const correspondingKey = document.querySelector(`[data-src="${sound.src}"]`);
                if (correspondingKey) {
                    correspondingKey.classList.add('active');
                    setTimeout(() => {
                        correspondingKey.classList.remove('active');
                    }, 200);
                }
            }, index * 500); // 每个音效延迟0.5秒播放
        });
    });

    // 点击清空按钮
    clearButton.addEventListener('click', function() {
        recordedSounds = [];// 清空录制的音效数组
        alert("已清空！");// 弹出警告框显示已清空消息
    });

    // 点击白键
    whiteKeys.forEach(key => {
        key.addEventListener('click', function() {
            
            if (recording) {
                // 如果在录制中，记录点击的音效和延迟时间
                recordedSounds.push({ src: this.getAttribute('data-src'), delay: 0 });
            }
            // 播放音效
            playSound(this.getAttribute('data-src'));
            // 添加点击效果
            this.classList.add('active');
            setTimeout(() => {
                this.classList.remove('active');
            }, 200);
        });
    });

    // 點擊黑键
    function handleBlackKeyClick(blackKeyClass) {
        const blackKeys = document.querySelectorAll(blackKeyClass);
        blackKeys.forEach(key => {
            key.addEventListener('click', function() {
                if (recording) {
                    // 如果在录制中，记录点击的音效和延迟时间
                    recordedSounds.push({ src: this.getAttribute('data-src'), delay: 0 });
                }
                // 播放音效
                playSound(this.getAttribute('data-src'));
                // 添加点击效果
                this.classList.add('active');
                setTimeout(() => {
                    this.classList.remove('active');
                }, 200);
            });
        });
    }

    // 调用函数并传递不同的黑键类名
    handleBlackKeyClick('.black-key-1');
    handleBlackKeyClick('.black-key-2');
    handleBlackKeyClick('.black-key-3');
    handleBlackKeyClick('.black-key-4');
    handleBlackKeyClick('.black-key-5');
    handleBlackKeyClick('.black-key-6');
    handleBlackKeyClick('.black-key-7');

    
});