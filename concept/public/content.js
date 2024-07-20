

function ajaxPost(url,data,callback) {$.ajax({
    url:url, headers: {}, data:data,
    type:"POST", dataType:"json",
    success:(R)=>{callback(R); },
    error:(err)=>{errSwal(err); }
}); }

const ssml = {
    layingOuter : function(allKategoriData){
        let htmlSTG = ''
        for(let kategoriData of allKategoriData){
            const productsdata = kategoriData.products

            let layout1 = `<div class='row'><div class="col-md-12"><h3>${kategoriData.name}</h3><div class='row'>`
            for(let product of productsdata){
                const cardlayout = ssml.carded(product.preview.content, product.title, "")
                layout1 += `<div class="col-md-3">${cardlayout}</div>`
            }
            layout1 += `</div></div></div>`
            
            htmlSTG += layout1
        }

        return htmlSTG
    },
    carded : function(imageURL, contentTitle, contentText){
        const htmlSTG = `
        <div class="card" style="max-width:230px; width:230px; max-height:300px; height:300px;"><div class="card-body">
            <div class="row"><div class="col-md-12">
                <img src="${imageURL}"style="width:100%; height:100%; max-width:150px; max-height:150px;">
            </div></div> 
            <div class="row"><div class="col-md-12">
                <h5 class="card-title">${contentTitle}</h5>
                <p class="card-text">${contentText}</p>
                <a data-toggle="tooltip" data-placement="top" 
                title="Edit NOT! this too" href="#" class="btn btn-primary">${ssml.ic_pencil()}</a>
                <a data-toggle="tooltip" data-placement="top" 
                title="Delete NOT! this too" href="#" class="btn btn-secondary">${ssml.ic_trash()}</a>
            </div></div> 

        </div> </div>`
        return htmlSTG
    },
    ic_pencil : function(){
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-pencil-fill" viewBox="0 0 16 16">
        <path d="M12.854.146a.5.5 0 0 0-.707 0L10.5 1.793 14.207 5.5l1.647-1.646a.5.5 0 0 0 0-.708zm.646 6.061L9.793 2.5 3.293 9H3.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.5h.5a.5.5 0 0 1 .5.5v.207zm-7.468 7.468A.5.5 0 0 1 6 13.5V13h-.5a.5.5 0 0 1-.5-.5V12h-.5a.5.5 0 0 1-.5-.5V11h-.5a.5.5 0 0 1-.5-.5V10h-.5a.5.5 0 0 1-.175-.032l-.179.178a.5.5 0 0 0-.11.168l-2 5a.5.5 0 0 0 .65.65l5-2a.5.5 0 0 0 .168-.11z"/>
      </svg>`
    },
    ic_trash : function(){
        return `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash-fill" viewBox="0 0 16 16">
        <path d="M2.5 1a1 1 0 0 0-1 1v1a1 1 0 0 0 1 1H3v9a2 2 0 0 0 2 2h6a2 2 0 0 0 2-2V4h.5a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1H10a1 1 0 0 0-1-1H7a1 1 0 0 0-1 1zm3 4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 .5-.5M8 5a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-1 0v-7A.5.5 0 0 1 8 5m3 .5v7a.5.5 0 0 1-1 0v-7a.5.5 0 0 1 1 0"/>
      </svg>`
    },
}

$(document).ready(function() {
    console.log('start')

    $("#cdgip-s1").select2({placeholder:"kategori", tags:true, theme: "bootstrap"}).val('').trigger('change')

    $("#cdgbtn-c1").on('click',function(e){
        e.preventDefault()
        ajaxPost('/get/c1data',null, function(data){
            console.log(data.products)
            let content = ssml.layingOuter(data.products)
            $("#cdg-cont").html(content)
            $('[data-toggle="tooltip"]').tooltip()
        })
    })

    new DataTable('#cdg-tab', {
        ajax: {url: "/get/c2data", data:{}, type: "POST",dataSrc: function(R){return R; }},
        columns: [
            { data: 'id' },
            { data: 'name' },
            { data: 'score' },
            { data: 'emotion' },
            { data: 'created' },
        ]
    });

    ajaxPost('/get/c2data_no8',null, function(data){console.log(data)})
    ajaxPost('/get/c2data_no9',null, function(data){console.log(data)})
    ajaxPost('/get/c2data_no10',null, function(data){console.log(data)})
    $("#cdgbtn-c1").trigger('click')

    $('[data-toggle="tooltip"]').tooltip()
})
