import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { InfoIcon } from "lucide-react";

export default function OverviewComponent() {
  return (
    <>
      <div>
        <p className="text-md tracking-wider mt-5 text-muted-foreground">
          Indications of Adovas 200 ml This Adovas liquefies phlegm. It soothes
          irritation of the throat. Helps to relieve hoarseness. It is a remedy
          for all types of cough such as dry irritable cough, allergic & smokers
          cough.
          <br />
          <br />
          Composition: Each teaspoon full (5 ml) of syrup contains extracts of-
          Adhatoda vasica 0.68 gm Piper longum 0.14 gm Glycyrrhiza glabra 6.78
          mg Trikatu (Piper nigrum, Zingiber officinale) 20.34 mg Terminalia
          chebula 73.24 mg Vitis venifera 0.14 gm Acorus calamus 6.78 mg
          Saussurea lappa 6.78 mg Syzygium aromaticum 6.78 mg Trizatak
          (Cinnamomum zeylanicum, Elettaria cardamomum, Cinnamomum tamala) 20.34
          mg Pistacia integerrima 6.78 mg Myrica nagi 6.78 mg Woodfordia
          fruticosa 1.14 mg.
          <br />
          <br />
          Dosage of Adovas 200 ml: Children under 12 years: 1-2 teaspoonful
          (5-10 ml) 2-3 times a day. 'Adult: 3 teaspoonful (15 ml) 2-3 times a
          day.Some warm water may be added for better results.
          <br />
          <br />
          Interaction of Adovas 200 ml: No report is available.
          <br />
          <br />
          Contraindications: No report is available on contraindication. It may
          be happen in patients who are hypersensitive to any of its
          ingredients.
          <br />
          <br />
          Side Effects of Adovas 200 ml: This syrup is proven as safe. It is
          well tolerated. In high dose diarrhea, vomiting may occur.
          <br />
          <br />
          Storage Conditions: Keep out of reach of children. Keep away from
          direct sunlight. Store in a cool and dry place.
          <br />
          <br />
          Drug Classes: Herbal and Nutraceuticals
          <br />
          <br />
          Mode Of Action: Adhatoda vasica (Basok): Relieves cough & bronchial
          spasm. It liquefies mucous. Piper longum (Pipul): Relieves cold
          allergy & asthma. Glycyrrhiza glabra (Jashthi Modhu) : Relieves
          irritation of throat. Enhances the immune system. It is
          anti-inflammatory, demulcent & expectorant. Piper nigrum (Marich): It
          is fungistatic, bacteriostatic & anti-inflammatory. Zingiber
          officinale (Shunthi): It is antihistaminic. Very much effective in
          common cold. Terminalia chebula (Haritaki): It removes toxin from the
          body. It has beneficial effect on all tissues. Vitis venifera
          (Kismiss): Relieves cough and general tonic. Acorus calamus (Bacha):
          Helps in bronchial catarrh & intermittent fever. Saussurea lappa
          (Kur): It is antiseptic & disinfectant. It is very useful in bronchial
          asthma. Syzygium aromaticum (Labango): Useful in cough & other
          respiratory diseases. It prevents bad breath. Cinnamomum zeylanicum
          (Darchini): It is antibacterial & antifungal and relieves cough due to
          its soothing action. Elettaria cardamomum (Elachi): It is aromatic in
          nature and shows antimicrobial activity. Cinnamomum tamala (Tejpata):
          It is a tonic & appetizer agent. Pistacia integerrima (Kakra sringi):
          It helps in asthma. Myrica nagi ( Kotfal): It is a remedy for sore
          throat. Woodfordia fruticosa (Daiful): It is good anti-infective agent
          and is useful in relieving cough due to its soothing action. Tulsi
          extract & other ingredients: Tulsi extract & some other ingredients
          are added to DEVAS syrup for relieving acute cough.
          <br />
          <br />
          Pregnancy: The safety of this syrup in pregnancy has not been studied.
          Therefore, it should be used with caution during pregnancy.
        </p>
        <Alert className="mt-9">
          <InfoIcon />
          <AlertTitle>Disclaimer</AlertTitle>
          <AlertDescription>
            The information provided is accurate to our best practices, but it
            does not replace professional medical advice. We cannot guarantee
            its completeness or accuracy. The absence of specific information
            about a drug should not be seen as an endorsement. We are not
            responsible for any consequences resulting from this information, so
            consult a healthcare professional for any concerns or questions.
          </AlertDescription>
        </Alert>
      </div>
    </>
  );
}
