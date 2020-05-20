(function () {
    var productData = window.productData,
        twData = window.twData || [];
    delete window.productData;
    delete window.twData;
    try {
        gtag('event', 'view_item', {
            "items": [
                {
                    "id": productData.product.id,
                    "name": productData.product.sku,
                    "quantity": 1,
                    "price": productData.product.sale_price
                }
            ]
        });
    } catch (e) {}
    function pageFit(doc, win, maxwidth, minwidth, font) {
        var docEl = doc.documentElement,
            resizeEvt = 'orientationchange' in window
                ? 'orientationchange'
                : 'resize',
            recalc = function () {
                var clientWidth = docEl.clientWidth;
                if (!clientWidth) 
                    return;
                if (clientWidth >= minwidth && clientWidth <= maxwidth) {
                    docEl.style.fontSize = font * (clientWidth / maxwidth) + 'px';
                } else if (clientWidth > maxwidth) {
                    docEl.style.fontSize = font + 'px';
                } else if (clientWidth < minwidth) {
                    docEl.style.fontSize = font * (minwidth / maxwidth) + 'px';
                }
            };
        recalc();
        if (!doc.addEventListener) 
            return;
        win.addEventListener(resizeEvt, recalc, false);
        doc.addEventListener('DOMContentLoaded', recalc, false);
    }
    pageFit(document, window, 640, 320, 37.5);
    $('.video-wrapper, video').removeClass('video-wrapper');
    $('.description-body')
        .find('iframe')
        .wrap('<div class="video-wrapper"/>');
    $('.description-body')
        .find('video')
        .wrap('<div class="video-wrapper"/>');
    var ua = navigator.userAgent,
        iOS = /iPad|iPhone|iPod/.test(ua),
        iOS11 = /OS 11_0_1|OS 11_0_2|OS 11_0_3|OS 11_1|OS 11_1_1|OS 11_1_2|OS 11_2|OS 11_2_1/.test(
            ua
        );
    $('img[data-original]').lazyload({threshold: 500});
    var mySwiper1 = new Swiper('.swiper-container1', {
        slidesPerView: 1,
        loop: true,
        autoplay: {
            delay: 5000
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets'
        }
    });
    var time = new Date;
    time.setTime(Math.round(time / 3600000) * 3600000 + 3600000);
    timer(parseInt((time - (new Date)) / 1000));
    function timer(diff) {
        var ms = 0,
            _time = $('#seckill_time'),
            _hour = _time.find('.hour'),
            _minute = _time.find('.minute'),
            _second = _time.find('.s'),
            _msecond = _time.find('.ms');
        var func = function () {
            if (diff < 0) 
                return;
            if (--ms < 0) 
                ms = 9;
            _msecond.text(ms);
            if (ms === 9) {
                --diff;
                var hour = Math.floor(diff / 3600),
                    remain = diff - hour * 3600,
                    minute = Math.floor(remain / 60),
                    second = remain - minute * 60;
                if (hour < 10) 
                    hour = '0' + hour;
                if (minute < 10) 
                    minute = '0' + minute;
                if (second < 10) 
                    second = '0' + second;
                _hour.text(hour);
                _minute.text(minute);
                _second.text(second);
                if (diff == 0) {
                    _msecond.text(0);
                    clearInterval(seed);
                }
            }
        };
        func();
        var seed = setInterval(func, 100);
    }
    $(window).on('scroll', function () {
        var nav = $('.p-head'),
            scrollTop = document.documentElement.scrollTop || document.body.scrollTop,
            height = 48,
            scrollDiv = $('#scrollTop'),
            seckillDiv = $('.seckill-container'),
            dH = document.documentElement.clientHeight,
            imgH = parseInt($('.swiper-container').css('height')),
            orderSubmit = $('#submit_order');
        if (scrollTop > 5) {
            orderSubmit.show();
        }
        if (scrollTop >= imgH) {
            seckillDiv.addClass('fixed');
        } else {
            seckillDiv.removeClass('fixed');
        }
        if (scrollTop > dH + 100) {
            scrollDiv
                .addClass('fadeInRight')
                .addClass('loading')
                .removeClass('fadeOutRight')
                .show();
        } else {
            scrollDiv
                .removeClass('fadeInRight')
                .removeClass('loading')
                .addClass('fadeOutRight');
            setTimeout(function () {
                if (!scrollDiv.hasClass('loading')) {
                    scrollDiv.hide()
                }
            }, 500);
        }
    });
    $('#submit_order').click(function () {
        fbq && fbq("track", "AddToCart");
        try {
            gtag('event', 'ecommerce', {
                'event_category': 'Ecommerce',
                'event_action': 'AddToCart'
            });
            gtag('event', 'add_to_cart', {
                "items": [
                    {
                        "id": productData.product.id,
                        "name": productData.product.sku,
                        "quantity": 1,
                        "price": productData.product.sale_price
                    }
                ]
            });
        } catch (e) {}
        if (iOS && iOS11) {
            $('body').css('position', 'fixed');
        }
        $('.widgets-cover').addClass('show');
        locationLoad('[name=region_id]');
    });
    $('.sku-close').on('click', function () {
        var $cover = $(this).closest('.widgets-cover');
        if ($cover.hasClass('widgets-cover-order') && $('.sku-list-wrap').length > 0) {
            $cover
                .removeClass('widgets-cover-order')
                .addClass('widgets-cover-sku');
        } else {
            $cover.removeClass('show');
            if (iOS && iOS11) {
                $('body').css('position', 'relative');
            }
        }
    });
    $('input,textarea')
        .on('focus', function () {
            $(this)
                .data('pla', $(this).attr('placeholder'))
                .attr('placeholder', '');
        })
        .on('blur', function () {
            $(this).attr('placeholder', $(this).data('pla'));
        });
    var $skuInfo = $('.sku-info'),
        $imgWrap = $('.img-wrap img'),
        $priceWrap = $('.main .price'),
        setImages = false,
        setPrice = false;
    $('.sku-list-wrap .items a').on('click', function () {
        if ($(this).hasClass('disabled')) 
            return false;
        $(this)
            .toggleClass('checked')
            .siblings('a')
            .removeClass('checked');
        var ids = [],
            names = [],
            $variantId = $('[name=variant_id]'),
            $items = $('.sku-list-wrap .items');
        $('.sku-list-wrap .checked').each(function () {
            names.push('<span>' + String($(this).text()) + '</span>');
            ids.push(String($(this).data('id')));
        });
        $skuInfo
            .find('span.selected-container')
            .html(names.join(''));
        $variantId.val('');
        setImages = setPrice = false;
        productData
            .variants
            .forEach(function (variant) {
                var valIds = variant
                    .attributes
                    .split('-');
                if (!setImages && variant.images && inArray(ids, valIds)) {
                    $imgWrap.attr('src', variant.images);
                    setImages = true;
                }
                if (!setPrice && variant.sale_price_format && inArray(ids, valIds)) {
                    $priceWrap.text(variant.sale_price_format);
                    setPrice = true;
                }
                arrayDiff(valIds, ids).length || ($variantId.val(variant.id));
            });
        $('#quantity').trigger('input');
        $items
            .find('.disabled')
            .removeClass('disabled');
        $items
            .find('a')
            .each(function () {
                if ($(this).hasClass('checked')) 
                    return true;
                var nextIds = [String($(this).data('id'))],
                    $me = $(this),
                    disable = true;
                ids.forEach(function (id) {
                    $me
                        .parent()
                        .find('[data-id="' + id + '"]')
                        .length || nextIds.push(id);
                });
                $.each(productData.variants, function (i, variant) {
                    var valIds = variant
                        .attributes
                        .split('-');
                    if (variant.active && !arrayDiff(nextIds, valIds).length) {
                        disable = false;
                        return false;
                    }
                });
                $(this).toggleClass('disabled', disable);
            });
        function inArray(arr1, arr2) {
            for (var i in arr1) {
                var value = arr1[i];
                if ($.inArray(value, arr2) <= -1) {
                    return false;
                }
            }
            return true;
        }
        function arrayDiff(arr1, arr2) {
            var values = [];
            arr1.forEach(function (value) {
                $.inArray(value, arr2) > -1 || values.push(value);
            });
            return values;
        }
    });
    var $quantity = $('#quantity'),
        $quantityAdd = $('#quantity_add'),
        $quantityMinus = $('#quantity_minus');
    $quantityMinus.click(function () {
        var a = 1 * $quantity.val() - 1;
        a > productData.purchaseLimit && (a = productData.purchaseLimit);
        if (1 >= a) {
            $(this).addClass('disabled');
            a = 1;
        } else {
            $(this).removeClass('disabled');
            $quantityAdd.removeClass('disabled');
        }
        $quantity
            .val(a)
            .trigger('input');
    });
    $quantityAdd.click(function () {
        var a = 1 * $quantity.val() + 1;
        1 > a && (a = 1);
        if (a >= productData.purchaseLimit) {
            $(this).addClass('disabled');
        } else {
            $(this).removeClass('disabled');
            $quantityMinus.removeClass('disabled');
        }
        $quantity
            .val(a)
            .trigger('input');
    });
    $quantity.on('input propertychange', function () {
        var num = this.value * 1,
            data = {
                variant_id: $('[name=variant_id]').val(),
                quantity: num
            };
        if (num > productData.purchaseLimit) {
            showMessage(
                translate("Purchase limit {num} items.", {num: productData.purchaseLimit})
            );
            $(this).val(num = productData.purchaseLimit);
            return false;
        }
        $.post('/product/checkout?id=' + $('[name=id]').val(), data, function (resp) {
            $('#j_total').text(resp.data.totalFeeFormat);
        }, 'json');
    });
    $('.widgets-cover-sku .sku-buy').on('click', function () {
        if (!$('[name=variant_id]').val()) {
            showMessage(translate("Please select the product's attributes."));
            return false;
        }
        $(this)
            .closest('.widgets-cover')
            .removeClass('widgets-cover-sku')
            .addClass('widgets-cover-order');
    });
    $('.footer').on('click', '.order-buy', function () {
        try {
            gtag('event', 'ecommerce', {
                'event_category': 'Ecommerce',
                'event_action': 'SubmitOrder'
            });
            gtag('event', 'begin_checkout', {
                "items": [
                    {
                        "id": productData.product.id,
                        "name": productData.product.sku,
                        "quantity": $("#quantity").val(),
                        "price": productData.product.sale_price
                    }
                ]
            });
        } catch (e) {}
        try {
            fbq('track', 'InitiateCheckout');
        } catch (e) {}
        $.post(
            '../product/purchase',
            $('.j-checkout-form').serialize(),
            function (resp) {
                if (resp.error) {
                    showMessage(resp.message);
                    try {
                        gtag('event', 'ecommerce', {
                            'event_category': 'FormError',
                            'event_action': resp.data.name,
                            'event_label': resp.message
                        });
                    } catch (e) {}
                } else {
                    try {
                        gtag('event', 'ecommerce', {
                            'event_category': 'Ecommerce',
                            'event_action': 'Purchase',
                            'event_label': resp.data.id
                        });
                        gtag('event', 'purchase', {
                            "transaction_id": resp.data.tradeId,
                            "value": resp.data.amount,
                            "currency": resp.data.currency,
                            "items": [
                                {
                                    "id": productData.product.id,
                                    "name": productData.product.sku,
                                    "quantity": $("#quantity").val(),
                                    "price": productData.product.sale_price
                                }
                            ]
                        });
                    } catch (e) {}
                    try {
                        fbq('track', 'Purchase', {
                            value: resp.data.amount,
                            currency: resp.data.currency
                        });
                    } catch (e) {}
                    window.location.href = '/product/purchase-success?id=' + resp.data.id + '&trade' +
                            '_id=' + resp.data.tradeId;
                }
            },
            'json'
        );
        return false;
    });
    $('#scrollTop').click(function () {
        $('body,html').animate({
            scrollTop: 0
        }, 'slow');
    });
    var twCityHtml = '';
    for (var j in twData) {
        twCityHtml += '<option value="' + j + '">' + twData[j]['name'] + '</option>'
    }
    $('.tw-city')
        .html(twCityHtml)
        .on('change', function () {
            var id = $(this).val(),
                list = twData[id]['children'],
                html = '';
            for (var i in list) {
                html += '<option value="' + i + '">' + list[i] + '</option>'
            }
            $('.tw-area').html(html);
        })
        .trigger('change');
    function locationLoad(el) {
        var $el = $(el),
            data = $el.data(),
            key = ($el.attr('name') || '').replace('_id', '');
        if (!$el.length || !data.parent) {
            return;
        }
        $el
            .find('option:gt(0)')
            .remove();
        $.getJSON('../location/sublist', {
            id: data.parent
        }, function (resp) {
            if (resp.error) {
                showMessage(translate('Please refresh this page and try again.'));
                return;
            }
            var list = resp.data.list,
                html = [],
                value = list.length == 1
                    ? list[0].id
                    : '';
            list.forEach(function (row) {
                html.push('<option value="' + row.id + '">' + row.name + '</option>');
            });
            $el
                .append(html.join(''))
                .val(value)
                .trigger('change');
        });
    }
    $('.location select').on('change', function () {
        var value = $(this).val(),
            child = $(this).data('child');
        if (!value || !child) {
            return;
        }
        var $child = $('.location [name="' + child + '"]');
        if (!$child.length) {
            return;
        }
        $('.location [name=postcode_id]').val('');
        $child.data('parent', value);
        locationLoad($child);
    });
})();
function showMessage(message) {
    $('.layout-bg').show();
    $('#Validform_msg')
        .removeClass('zoomOut')
        .addClass('zoomIn')
        .show();
    $('.Validform_info').html(message);
    setTimeout(function () {
        $('#Validform_msg')
            .removeClass('zoomIn')
            .addClass('zoomOut');
        setTimeout(function () {
            $('#Validform_msg').hide();
        }, 500);
        $('.layout-bg').hide();
    }, 2000);
}