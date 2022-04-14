/// --- ABOUT PAGE --- ///
import "./AboutPage.scss";
import React from "react";
import Footer from "../../components/Footer/Footer";
import me from "../../assets/images/elke.jpg";
import gitHub from "../../assets/icons/GitHub-Mark-32px.png";
import linkedIn from "../../assets/icons/linkedin.png";

const AboutPage = () => {
	return (
		<>
			<main className="about">
				<article className="about__main">
					<h3 className="about__copy--highlight about__copy--bold">
						wayward is here for people who move around, connect and
						love to reconnect, who are interested in the social, and
						less in the media.
					</h3>
					{/* <h1 className="about__title">wayward...</h1> */}
					<p className="about__copy">
						While travelling, or moving around this wonderful,
						enticing globe for business, inevitable you make some
						meaningful connections. You want to stay in touch, but
						how? Email? Am I really going to send this person an
						email, and if I do, after how many emails does it stop?{" "}
						<br />
						Maybe we'll do facebook, yeah, easy, I can send a
						message, see what they are up to and oh... who's that,
						their niece? Their dog? Oh, another picture of their
						horse, I'm starting to lose interest and the algorithm
						knows... Slowly this becomes another person in a long
						list of friends you're in the end not so connected to.
						So, is that the end of the story? Does our connection
						end there, or is there a better way to stay in touch? I
						plan on travelling, and write a message on my Facebook
						wall @everyone:{" "}
						<span className="about__copy--bold">
							I'm going to Asia! Anyone around? Anyone want to
							meet up?
						</span>
						<br />I hardly ever post on Facebook, and haven't liked
						much lately either... my message doesn't reach a lot of
						people, and if it does it's people from my hometown
						reacting: "Cool, have fun!". While grateful for their
						cheers, I was hoping some of those travelling souls I
						met along the way would respond, and we could reconnect.
						<h3 className="about__copy--highlight">
							... enter: wayward...
						</h3>
						With wayward you can stay touch with people you met on
						the road, chat with them AND see where in the world they
						are right now! <br />
						Have a 48h layover in London? See who's around, reach
						and have them show you around. Moving to Madrid and
						wondering if you know someone there? You get the
						picture.
					</p>
				</article>
				<aside className="about__me">
					<div className="about__me-header">
						<h2 className="about__me-title">About me </h2>
						<img src={me} alt="" className="about__me-img" />
					</div>
					<p>
						Passionate, full-stack Web Developer who thrives in
						solving real-world problems elegantly with modern best
						practices. Loves a good challenge and putting her head
						down with a team of like-minded engineers to produce a
						great, useful product.
					</p>
				</aside>
				<article className="about__connect">
					<div className="about__connect-header">
						<h2 className="about__connect-title">LET'S CONNECT </h2>
					</div>
					<div className="about__connect-body">
						<a
							href="https://github.com/elke-codes"
							target="_blank"
							title="See my projects on GitHub">
							<img
								src={gitHub}
								alt="github logo"
								className="about__connect-img"
							/>
						</a>
						<a
							href="https://www.linkedin.com/in/elke-dick/"
							target="_blank"
							title="Get to know me better on LinkedIn">
							<img
								src={linkedIn}
								alt="linkedin logo"
								className="about__connect-img"
							/>
						</a>
					</div>
					<a
						href="mailto:elke.codes@gmail.com"
						target="_blank"
						title="Email me!">
						elke.codes@gmail.com
					</a>
				</article>
			</main>
			<Footer />
		</>
	);
};

export default AboutPage;
