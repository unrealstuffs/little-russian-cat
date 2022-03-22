import { useState } from 'react'
import { Swiper, SwiperSlide } from 'swiper/react'
import { Parallax, Navigation, Mousewheel, FreeMode, Controller } from 'swiper'
import { CSSTransition } from 'react-transition-group'

import 'swiper/css'
import 'swiper/css/pagination'
import 'swiper/css/navigation'
import 'swiper/css/free-mode'
import 'swiper/css/thumbs'

import slides from './constants/slides'

const App = () => {
	const [controlledSwiper, setControlledSwiper] = useState(null)
	const [showedSlide, setShowedSlide] = useState(0)
	const [showDesc, setShowDesc] = useState(true)

	return (
		<>
			<CSSTransition
				in={showDesc}
				timeout={350}
				classNames='display'
				unmountOnExit
			>
				<div className={`description`}>
					<div className='logo'>Чмоня</div>
					<p>
						Маленький черный котенок, ставший мемом в рунете. На
						наиболее известном снимке котенок сидит на панели
						автомобиля. В конце 2021 года у котенка появилась кличка
						– Чмоня. Именно так подписал картинку фильтр,
						определяющий предметы по фото.
					</p>
				</div>
			</CSSTransition>

			<Swiper
				freeMode={true}
				centeredSlides={true}
				onSlideChange={(e: any) => {
					setShowDesc(e.activeIndex > 0 ? false : true)
				}}
				spaceBetween={60}
				slidesPerView={3.5}
				mousewheel={true}
				parallax={true}
				className={'slider slider__main'}
				controller={{ control: controlledSwiper }}
				modules={[
					Parallax,
					Navigation,
					Mousewheel,
					FreeMode,
					Controller,
				]}
			>
				{slides.map(({ id, dataParallax, img }) => (
					<SwiperSlide
						onClick={() =>
							setShowedSlide(showedSlide !== 0 ? 0 : id)
						}
						className={`slider__item ${
							showedSlide === id ? 'opened' : ''
						}`}
						key={id}
					>
						<div
							className='slider__img'
							data-swiper-parallax={dataParallax}
							style={{
								backgroundImage: `url(/${img})`,
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>
			<Swiper
				onSwiper={setControlledSwiper}
				centeredSlides={true}
				spaceBetween={60}
				parallax={true}
				slidesPerView={3.5}
				className={'slider slider__bg'}
				modules={[Parallax, Controller]}
			>
				{slides.map(({ id, dataParallax, img }) => (
					<SwiperSlide className={'slider__item'} key={id}>
						<div
							className='slider__img'
							data-swiper-parallax={dataParallax}
							style={{
								backgroundImage: `url(/${img})`,
							}}
						></div>
					</SwiperSlide>
				))}
			</Swiper>
		</>
	)
}

export default App
