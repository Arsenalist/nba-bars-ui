<script>
    function select() {
        const e = document.getElementById('credit-text')
        e.focus();
        e.select();
    }
</script>
<style>
    textarea {
        font-size: .8em;
    }
</style>
<p>For bugs or feature requests email raptorsrepublic@gmail.com</p>
<p>This website is completely free. If you do use any of the data from here please credit by copy-pasting the following:</p>
<textarea  readonly="readonly" id="credit-text" rows="2" cols="80" on:click={select()}>via <a href="https://bars.raptorsrepublic.com/">bars</a> from <a href="https://www.raptorsrepublic.com">raptorsrepublic.com</a></textarea>


