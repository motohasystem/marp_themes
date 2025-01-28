(() => {
    const DEBUG = true;
    const REVERSE_UPDOWN = true;
    const RAPID_PAGE_SCROLL_GAP = 500;
    document.addEventListener("DOMContentLoaded", (event) => {
        // 自分自身のファイル名を取得
        console.log("Gamepad library loaded.");

        window.addEventListener("gamepadconnected", (e) => {
            console.log("Gamepad connected:", e.gamepad);
            requestAnimationFrame(updateGamepadStatus);
        });
        // let global_whiteouted = false;
        let global_last_cursor = null;
        let global_last_button = null;
        let global_last_button_time = null;
        let global_rapid_scroll = false;

        function updateGamepadStatus() {
            const gamepads = navigator.getGamepads();

            for (let i = 0; i < gamepads.length; i++) {
                const gp = gamepads[i];
                if (gp) {
                    const sticks = gp.axes;
                    let x_newtral = false;
                    let y_newtral = false;
                    sticks.forEach((stick, index) => {
                        // console.log({ stick, index });
                        if (index == 0) {
                            if (stick > 0.5) {
                                simulateCursorKeyPress("ArrowRight");
                                x_newtral = false;
                            } else if (stick < -0.5) {
                                simulateCursorKeyPress("ArrowLeft");
                                x_newtral = false;
                            } else {
                                x_newtral = true;
                            }
                        } else if (index == 1) {
                            if (REVERSE_UPDOWN) {
                                stick = -stick;
                            }

                            if (stick > 0.5) {
                                simulateCursorKeyPress("ArrowDown");
                                y_newtral = false;
                            } else if (stick < -0.5) {
                                simulateCursorKeyPress("ArrowUp");
                                y_newtral = false;
                            } else {
                                y_newtral = true;
                            }
                        } else if (x_newtral && y_newtral) {
                            simulateCursorKeyPress("ArrowNewtral");
                        }
                    });

                    // console.log(gp.buttons);
                    let count_pressed_button = 0;
                    gp.buttons.forEach((button, index) => {
                        if (button.pressed) {
                            switch (index) {
                                case 0: // A
                                    simulateButtonPress("a");
                                    break;
                                case 1: // B
                                    simulateButtonPress("b");
                                    break;
                                case 7: // C
                                    simulateButtonPress("c");
                                    break;
                                case 2: // X
                                    simulateButtonPress("x");
                                    break;
                                case 3: // Y
                                    simulateButtonPress("y");
                                    break;
                                case 5: // Z
                                    simulateButtonPress("z");
                                    break;
                            }
                            count_pressed_button++;
                            // } else {
                            //     console.log({ index });
                        }
                    });

                    // ボタンが何も押されていなければニュートラルボタンを押す
                    if (count_pressed_button == 0) {
                        simulateButtonPress("buttonNewtral");
                    }
                }
            }
            requestAnimationFrame(updateGamepadStatus);
        }

        // RAPID_PAGE_SCROLL_GAP ミリ秒以内にボタンが押された場合はtrueを返す
        function isRapidButtonPress() {
            if (global_last_button_time === null) {
                return false;
            }
            const now = new Date().getTime();
            if (now - global_last_button_time < RAPID_PAGE_SCROLL_GAP) {
                return true;
            }
            global_rapid_scroll = true;
            return false;
        }

        // カーソルキーを受け取る
        function simulateCursorKeyPress(key) {
            // ニュートラルキーが押された場合はリセットする
            if (key === "ArrowNewtral") {
                global_rapid_scroll = false;
                global_last_cursor = null;
            }

            // 連続で同じキーが押された場合は無視する
            if (
                isRapidButtonPress() == true &&
                global_rapid_scroll == false &&
                global_last_cursor === key
            ) {
                return;
            }

            DEBUG ? console.log({ key }) : null;
            const event = new KeyboardEvent("keydown", { key: key });
            document.dispatchEvent(event);
            global_last_cursor = key;

            // 現在時刻を入れる
            global_last_button_time = new Date().getTime();
        }

        // ボタン操作を受け取る
        function simulateButtonPress(key) {
            if (global_last_button === key) {
                return;
            }

            console.log({ key });
            const event = new KeyboardEvent("keydown", { key: key });
            document.dispatchEvent(event);
            global_last_button = key;

            if (key === "a" || key === "b" || key === "z") {
                whiteout();
            } else if (key === "x" || key === "y") {
                blackout();
            }
        }

        function whiteout() {
            createWipeout("#FFF");
        }

        function blackout() {
            createWipeout("#000");
        }

        // 画面全体を非表示にして真っ黒にする。window.global_whiteouted を利用してもう一度呼び出されるともとに戻す。
        function createWipeout(color = "#FFF") {
            const node = document.getElementById("wipeout");
            if (node !== null) {
                node.remove();
                return;
            }
            const whiteout = document.createElement("div");
            whiteout.id = "wipeout";
            whiteout.style.position = "fixed";
            whiteout.style.top = "0";
            whiteout.style.left = "0";
            whiteout.style.width = "100%";
            whiteout.style.height = "100%";
            whiteout.style.backgroundColor = color;
            whiteout.style.zIndex = "10000";
            document.body.appendChild(whiteout);
        }
    });
})();
