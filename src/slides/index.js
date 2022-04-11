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

    <S.Note>⏱️ Temps de lecture: 5 minutes</S.Note>

    <p>
      Faites défiler pour commencer
      <br />⏬
    </p>

    <S.Note>
      Ou allez directement au{" "}
      <a href="/simulator" target="_blank" rel="noreferrer">
        simulateur de second tour
      </a>
      .
    </S.Note>
  </Slide>,
  <Slide>
    <p>
      Le dimanche 10 avril s'est déroulé le premier tour de l'élection
      présidentielle.
    </p>
    <p>Nous allons observer ses résultats sous différents angles.</p>
    <S.Note>
      Les pourcentages présentés ici prennent en compte l'entierté du corps
      électoral, ils diffèrent donc des résultats officiels qui se basent
      seulement sur les voix exprimées.
    </S.Note>
  </Slide>,
  <Slide>
    <p>
      Le point d'attention principal est l'abstention massive lors de cette
      élection.
    </p>
    <p>54M de Français·es majeur·es avaient la possibilité de voter.</p>
    <p>
      Cependant, une grande partie ne s'est pas inscrit·es sur les listes
      électorales, ou n'a pas voté pour un·e des douze candidat·es.
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
      En considérant les voix obtenues par l'opposition, il faut nuancer car
      elle n'est pas un bloc uniforme.
    </p>
    <p>
      On peut séparer les oppositions selon plusieurs critères, mais pour rester
      simple ici, nous les séparons selon leur orientation sur l'axe
      gauche-droite par rapport au président sortant.
    </p>
  </Slide>,
  <Slide>
    <p>
      À l'issue du premier tour, les deux candidat·es avec le plus grand nombre
      de voix sont sélectionné·es pour le second tour.
    </p>
    <p>
      On observe ici comment la division dans un même bloc peut réduire les
      chances de victoire d'un·e orientation politique.
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
      Envie d'explorer les différents scénarios sur base des reports de voix ?
      Jouez avec les chiffres dans le{" "}
      <a href="/simulator" target="_blank" rel="noreferrer">
        simulateur de second tour
      </a>
      .
    </S.Note>
  </Slide>,
  <Slide>
    <S.Note>
      J'espère que cette mise en perspective des chiffres vous a plu.
    </S.Note>
    <S.Note>
      Consultez{" "}
      <a
        href="https://docs.google.com/spreadsheets/d/1cnfWoX2vZbWeYwLIiKC5MJJeFgGYCl2Uv_FGey4M9Os/edit?usp=sharing"
        target="_blank"
        rel="noreferrer"
      >
        les données brutes et les sources
      </a>
      .
    </S.Note>
    <h3>Crédits</h3>
    <S.Note>
      Conception et réalisation par{" "}
      <a href="https://github.com/tchapeaux" target="_blank" rel="noreferrer">
        tchap
      </a>
      .
      <br />
      Conseils UX par Banjopalmo.
    </S.Note>
    <S.Note>
      Consultez le{" "}
      <a
        href="https://github.com/tchapeaux/fr-22-results-visualizer"
        target="_blank"
        rel="noreferrer"
      >
        code source
      </a>{" "}
      ou envoyez-moi un{" "}
      <a href="https://twitter.com/bafaltom" target="_blank" rel="noreferrer">
        tweet
      </a>
      .
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
  </Slide>,
];
