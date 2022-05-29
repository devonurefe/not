const yeniGorev = document.querySelector(".input-gorev");
const yeniGorevEkleBtn = document.querySelector(".btn-gorev-ekle");
const gorevListesi = document.querySelector(".gorev-listesi");

yeniGorevEkleBtn.addEventListener("click", gorevEkle);
gorevListesi.addEventListener("click", gorevSilTamamla);
document.addEventListener("DOMContentLoaded", localStorageOku);

function gorevSilTamamla(e) {
  const tiklanEleman = e.target;

  if (tiklanEleman.classList.contains("gorev-btn-tamamlandi")) {
    tiklanEleman.parentElement.classList.toggle("gorev-tamamlandi");
  }

  if (tiklanEleman.classList.contains("gorev-btn-sil")) {
    tiklanEleman.parentElement.classList.toggle("kaybol");
    const silinecekGorev = tiklanEleman.parentElement.children[0].innerText;
    localStorageSil(silinecekGorev);

    tiklanEleman.parentElement.addEventListener("transitionend", function () {
      tiklanEleman.parentElement.remove();
    });
  }
}

function gorevEkle(e) {
  e.preventDefault();

  gorevItemOlustur(yeniGorev.value);
  //localstorage kaydet
  localStorageKaydet(yeniGorev.value);
  yeniGorev.value = "";
}

function localStorageKaydet(yeniGorev) {
  let gorevler;

  if (localStorage.getItem("gorevler") === null) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }

  gorevler.push(yeniGorev);
  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}

function localStorageOku() {
  let gorevler;

  if (localStorage.getItem("gorevler") === null) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }
  gorevler.forEach(function (gorev) {
    gorevItemOlustur(gorev);
  });
}

function gorevItemOlustur(gorev) {
  //div olustur
  const gorevDiv = document.createElement("div");
  gorevDiv.classList.add("gorev-item");

  //li olusturma
  const gorevLi = document.createElement("li");
  gorevLi.classList.add("gorev-tanim");
  gorevLi.innerText = gorev;
  gorevDiv.appendChild(gorevLi);

  // tamamlandi butonu ekle
  const gorevTamamBtn = document.createElement("button");
  gorevTamamBtn.classList.add("gorev-btn");
  gorevTamamBtn.classList.add("gorev-btn-tamamlandi");
  gorevTamamBtn.innerHTML = `<i class="fa-solid fa-check"></i>`;
  gorevDiv.appendChild(gorevTamamBtn);

  // sil butonu ekle
  // tamamlandi butonu ekle
  const gorevSilBtn = document.createElement("button");
  gorevSilBtn.classList.add("gorev-btn");
  gorevSilBtn.classList.add("gorev-btn-sil");
  gorevSilBtn.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  gorevDiv.appendChild(gorevSilBtn);

  //ul ye olusturulan div eklendi
  gorevListesi.appendChild(gorevDiv);
}

function localStorageSil(gorev) {
  let gorevler;

  if (localStorage.getItem("gorevler") === null) {
    gorevler = [];
  } else {
    gorevler = JSON.parse(localStorage.getItem("gorevler"));
  }

  // splice ile item sil
  const silinecekElemanIndex = gorevler.indexOf(gorev);
  console.log(silinecekElemanIndex);
  gorevler.splice(silinecekElemanIndex, 1);

  localStorage.setItem("gorevler", JSON.stringify(gorevler));
}
