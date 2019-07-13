    const action1 = 'FETCH_USERS'
    const action2 = 'FETCH_ARTICLES'
    const action3 = 'FETCH_BOOKS'
    let isLoading = false;

    function evaluate() {
      setInterval(() => {
        isLoading = true;
        const result = Math.floor(Math.random() * 9) + 1
        let selectedAction;
        if (result === 1) selectedAction = action1;
        if (result === 2) selectedAction = action2;
        if (result === 3) selectedAction = action3;

        if (
          selectedAction === 'FETCH_USERS' &&
          selectedAction === 'FETCH_ARTICLES' &&
          selectedAction === 'FETCH_BOOKS'
        ) {
          isLoading = false;
        }
        console.log(isLoading)
      }, 1000);
    }

    evaluate()