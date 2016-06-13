<hello-word>
    <h1>{title}</h1>
    <input type="text" id="txtInput" onkeyup={setLength}>
    <h3>fdsafsd</h3>
    <h5>fsdafsd</h5>
    <script>
        var self = this;
        var ajaxHelper = opts.ajaxHelper;
        var pGetClientDetail = ajaxHelper.getPromise('http://ip-api.com/json');
        pGetClientDetail.then(function fulfilled(contents) {
                    var obj = JSON.parse(contents.responseText);
                    title = JSON.stringify(obj);
                    self.update();
                },
                function rejected(reason) {
                    console.log(readson);
                });

        title = this.txtInput.value + opts.title;
        setLength = (ele) =>
        {
            console.log(ele);
            title = this.txtInput.value + opts.title;
            this.update();
        }

    </script>
</hello-word>
