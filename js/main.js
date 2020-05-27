initFeatures({
	lang : 'pl', // список языков - vn, it, es, co, hr, en, de, fr, ph, cz, id, th, gr, bg, al, ro, sg, en_sg, mk, si, sk, lv, hu, pl, lt, pt
	product : 'Platinum Gel', // название продукта
	genderTargetting : 'all', // пол целевой аудитории - all, male, female
	
	form : {
		isNeeded : 1, // 1-включить форму, 0-выключить
		img: 'img/product.png', // путь до картинки продукта
		price : true, // плашка с ценой
		priceBrFix : true, // фиксит отображение цен в ценике (true - уберает перенос строки)
		showSelect : false, // показывать или скрывать поле select
		untilExpire : 600 // таймер окончания акции где 600 = 10мин. Ставим 0 если таймер не нужен.
	},

	autoComments : {
		isNeeded : 0, // 1-включить автокомы, 0-выключить
		bgColor : '#d7f2d8' // цвет фона блока комчиков
},
	
	popups : {
		isNeeded : 1, // 1-включить попы, 0-выключить
		bgColor: 'rgba(87, 86, 141, 0.8)', // цвет фона сообщения
		textColor : '#fff', // цвет основного текста сообщения
		emphColor : 'cyan', // цвет выделений в сообщениях (например, 'со скидкой XX%', '' )
		blackIcons :  false // черные или белые иконки, значения true или false
	},
	
	wheel : {
		isNeeded : 0, // 1-включить колесо, 0-выключить
		customWheel : false // ссылка на свое колесо, либо false
	}
});