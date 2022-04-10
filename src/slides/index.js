import VisibilitySensor from "react-visibility-sensor";

import * as S from "./styles";

function Slide({ containerRef, children, onVisibilityChange }) {
  return (
    <>
      <VisibilitySensor
        container={containerRef.current}
        onChange={onVisibilityChange}
        partialVisibility={true}
      >
        <S.SlideWrapper>{children}</S.SlideWrapper>
      </VisibilitySensor>
      <S.Padding />
    </>
  );
}

export default [
  <Slide>
    <h1>Élections Présidentielles de 2022</h1>

    <p>Mise en perspective des résultats</p>

    <p>
      Faites défiler pour commencer
      <br />⏬
    </p>

    <S.Note>⏱️ Temps de lecture: 5 minutes</S.Note>
  </Slide>,
  <Slide>
    <p>
      Le dimanche 10 avril s'est déroulé le premier tour de l'élection
      présidentielle.
    </p>
    <p>Nous allons observer ses résultats sous différents angles.</p>
    {/*<S.Note>
      Les pourcentages présentés ici prennent en compte l'entierté du corps
      électoral, ils peuvent donc différer des résultats officiels qui masquent
      l'abstention, le vote blanc ou nul, et les personnes non inscrites.
    </S.Note>*/}
  </Slide>,
  <Slide>
    <p>Un premier zoom sur l'abstention:</p>
    <p>54M de Français·es majeur·es avaient la possibilité de voter.</p>
    <p>
      Cependant, une part non négligeable n'a pas voté pour un·e des douze
      candidat·es, ou ne s'est même pas inscrit·es sur les listes électorales.
    </p>

    {/*<S.Note>
      Pour en savoir plus sur l'abstention, sa sociologie et ses raisons, voici{" "}
      <a
        href="https://fr.wikipedia.org/wiki/Sociologie_du_vote#Analyses_de_la_participation_%C3%A9lectorale"
        target="_blank"
        rel="noreferrer"
      >
        une première piste
      </a>
      .
    </S.Note>*/}
  </Slide>,
  <Slide>
    <p>
      Isolons maintenant le score du président sortant, qui se présentait pour
      un deuxième mandat.
    </p>
    <p>
      Il est le candidat qui a reçu le plus de votes. Cependant, ce nombre est
      inférieur au total des voix reçues par les candidat·es d'opposition, et
      aux voix non exprimées.
    </p>
  </Slide>,
  <Slide>
    <p>
      En considérant les voix obtenues par l'opposition, il faut nuancer en
      précisant qu'elle n'est pas un bloc uniforme.
    </p>
    <p>
      Chaque candidat·e se revendique d'une position unique, mais pour
      simplifier la lecture nous les séparons ici selon leur orientation sur
      l'axe gauche-droite par rapport au président sortant.
    </p>
  </Slide>,
  <Slide>
    <p>
      À l'issue du premier tour, les deux candidat·es avec le plus grand nombre
      de voix ont été sélectionné·es pour le second tour, qui se déroulera deux
      semaines après le premier.
    </p>
    <p>
      On observe ici que la division dans un même bloc réduit les chances de
      victoire d'un·e orientation politique.
    </p>
  </Slide>,
  <Slide>
    <p>Observons maintenant le point de départ pour le second tour.</p>
    <p>
      La plupart des électeur·rices n'ont pas voté pour un·e des candidat·es
      qualifié·es. Ce sont à elles et eux de décider l'issue du second tour.
    </p>
    <p>
      Elles et ils peuvent soit donner leur voix du second tour à un·e
      candidat·e restant·e, soit ne pas aller voter.
    </p>

    <S.Note>
      Les électeur·rices qui ont voté pour un·e candidat·e qualifié·e au premier
      tour peuvent également changer leur vote.
    </S.Note>
  </Slide>,
  <Slide>
    <p>
      Parmis les candidat·es éliminé·es, certain·es ont exprimé des consignes de
      votes pour leurs électeur·rices au second tour.
    </p>
    <p>
      On montre ici la situation sur base de ces consignes de votes, que chaque
      électeur·rice suivra ou non.
    </p>

    <S.Note>
      Envie d'explorer les différents scénarios ? Joue avec les chiffres dans le{" "}
      <a href="/simulator" target="_blank" rel="noreferrer">
        simulateur de second tour.
      </a>
    </S.Note>
  </Slide>,
  <Slide>
    <p>Merci pour votre attention !</p>
    <S.Note>
      Consulter les{" "}
      <a
        href="https://docs.google.com/spreadsheets/d/1cnfWoX2vZbWeYwLIiKC5MJJeFgGYCl2Uv_FGey4M9Os/edit?usp=sharing"
        target="_blank"
        rel="noreferrer"
      >
        données brutes et sources
      </a>
      .
    </S.Note>
    <h3>Crédits</h3>
    <S.Note>
      Conception et réalisation par{" "}
      <a href="https://github.com/tchapeaux" target="_blank" rel="noreferrer">
        tchap
      </a>{" "}
      (
      <a
        href="https://codesandbox.io/s/22-presidential-results-slideshow-b0ihgb"
        target="_blank"
        rel="noreferrer"
      >
        code source
      </a>
      ).
      <br />
      Conseils UX par Banjopalmo.
    </S.Note>
    <S.Note>
      Figures réalisées avec{" "}
      <a href="https://www.chartjs.org/" target="_blank" rel="noreferrer">
        Chart.js
      </a>
      .
      <br />
      Mesures d'audience non-intrusives via{" "}
      <a href="https://plausible.io/" target="_blank" rel="noreferrer">
        Plausible
      </a>{" "}
      (
      <a
        href="https://plausible.io/fr-22-analysis.tchapeaux.vercel.app"
        target="_blank"
        rel="noreferrer"
      >
        Statistiques publiques
      </a>
      ).
    </S.Note>
  </Slide>
];
