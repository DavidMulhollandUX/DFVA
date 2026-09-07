// GENERATED FILE — DO NOT EDIT.
// Source: dfva/source/rubricV4.ts + dfva/source/evidence/*.json (panelCv4 blocks)
// Regenerate: npm --prefix scripts run dfva:gen-v4
// Eager map over every per-program module, for scripts and tests. The client
// never imports this file: the report page loads one record through
// ./v4PanelC/index, and the V4ReportPage bundle budget fails CI if this map
// reaches the browser.
// Types are canonical in v4Meta.ts (the light module every route may import);
// re-exported here so a file can import both a type and a value from this
// one specifier without also naming v4Meta.ts.
export type {
  V4Adjudication,
  V4ItemResult,
  V4GateResult,
  V4PanelC,
  V4PanelATier,
  V4PanelAGrain,
  V4PanelABasis,
  V4OnlyProgram,
} from "./v4Meta";
export {
  V4_ONLY_PROGRAMS,
  V4_PANEL_A_BASIS,
  v4OnlyProgramByCode,
  v4PanelABasisByCode,
} from "./v4Basis";
import type { V4PanelC } from "./v4Meta";
import p_038ab from "./v4PanelC/038ab";
import p_080cl from "./v4PanelC/080cl";
import p_080cn from "./v4PanelC/080cn";
import p_097ab from "./v4PanelC/097ab";
import p_175aa from "./v4PanelC/175aa";
import p_192aa from "./v4PanelC/192aa";
import p_195aa from "./v4PanelC/195aa";
import p_244cw from "./v4PanelC/244cw";
import p_274ab from "./v4PanelC/274ab";
import p_277aa from "./v4PanelC/277aa";
import p_294be from "./v4PanelC/294be";
import p_300bb from "./v4PanelC/300bb";
import p_305bb from "./v4PanelC/305bb";
import p_342aa from "./v4PanelC/342aa";
import p_344ab from "./v4PanelC/344ab";
import p_439fs from "./v4PanelC/439fs";
import p_502cw from "./v4PanelC/502cw";
import p_504aa from "./v4PanelC/504aa";
import p_507aa from "./v4PanelC/507aa";
import p_510aa from "./v4PanelC/510aa";
import p_511aa from "./v4PanelC/511aa";
import p_526aa from "./v4PanelC/526aa";
import p_527cl from "./v4PanelC/527cl";
import p_527cn from "./v4PanelC/527cn";
import p_635aa from "./v4PanelC/635aa";
import p_706aa from "./v4PanelC/706aa";
import p_742ab from "./v4PanelC/742ab";
import p_746st from "./v4PanelC/746st";
import p_761em from "./v4PanelC/761em";
import p_841ac from "./v4PanelC/841ac";
import p_872bb from "./v4PanelC/872bb";
import p_991aa from "./v4PanelC/991aa";
import p_b_agr from "./v4PanelC/b-agr";
import p_b_arts from "./v4PanelC/b-arts";
import p_b_bmed from "./v4PanelC/b-bmed";
import p_b_com from "./v4PanelC/b-com";
import p_b_des from "./v4PanelC/b-des";
import p_b_faacting from "./v4PanelC/b-faacting";
import p_b_faanim from "./v4PanelC/b-faanim";
import p_b_fadance from "./v4PanelC/b-fadance";
import p_b_fafilmtv from "./v4PanelC/b-fafilmtv";
import p_b_famusth from "./v4PanelC/b-famusth";
import p_b_fapro from "./v4PanelC/b-fapro";
import p_b_fascwri from "./v4PanelC/b-fascwri";
import p_b_fath from "./v4PanelC/b-fath";
import p_b_favisart from "./v4PanelC/b-favisart";
import p_b_mus from "./v4PanelC/b-mus";
import p_b_sci from "./v4PanelC/b-sci";
import p_b_sciextd from "./v4PanelC/b-sciextd";
import p_d01lf from "./v4PanelC/d01lf";
import p_dr_philedp from "./v4PanelC/dr-philedp";
import p_j17re from "./v4PanelC/j17re";
import p_m04aa from "./v4PanelC/m04aa";
import p_mc_actsc from "./v4PanelC/mc-actsc";
import p_mc_actscen from "./v4PanelC/mc-actscen";
import p_mc_actscex from "./v4PanelC/mc-actscex";
import p_mc_adolhw from "./v4PanelC/mc-adolhw";
import p_mc_advnpph from "./v4PanelC/mc-advnpph";
import p_mc_aecoenh from "./v4PanelC/mc-aecoenh";
import p_mc_aemtrcs from "./v4PanelC/mc-aemtrcs";
import p_mc_agsc from "./v4PanelC/mc-agsc";
import p_mc_aimo from "./v4PanelC/mc-aimo";
import p_mc_anamgt from "./v4PanelC/mc-anamgt";
import p_mc_anp from "./v4PanelC/mc-anp";
import p_mc_anpnp from "./v4PanelC/mc-anpnp";
import p_mc_ap from "./v4PanelC/mc-ap";
import p_mc_apbusa from "./v4PanelC/mc-apbusa";
import p_mc_apling from "./v4PanelC/mc-apling";
import p_mc_app from "./v4PanelC/mc-app";
import p_mc_arch from "./v4PanelC/mc-arch";
import p_mc_archcm from "./v4PanelC/mc-archcm";
import p_mc_archeng from "./v4PanelC/mc-archeng";
import p_mc_archuch from "./v4PanelC/mc-archuch";
import p_mc_archud from "./v4PanelC/mc-archud";
import p_mc_archup from "./v4PanelC/mc-archup";
import p_mc_arclarc from "./v4PanelC/mc-arclarc";
import p_mc_arcprop from "./v4PanelC/mc-arcprop";
import p_mc_ba from "./v4PanelC/mc-ba";
import p_mc_bamktg from "./v4PanelC/mc-bamktg";
import p_mc_base from "./v4PanelC/mc-base";
import p_mc_biomeng from "./v4PanelC/mc-biomeng";
import p_mc_biosenh from "./v4PanelC/mc-biosenh";
import p_mc_bmedsc from "./v4PanelC/mc-bmedsc";
import p_mc_bus from "./v4PanelC/mc-bus";
import p_mc_busana from "./v4PanelC/mc-busana";
import p_mc_cat from "./v4PanelC/mc-cat";
import p_mc_chemeng from "./v4PanelC/mc-chemeng";
import p_mc_civeng from "./v4PanelC/mc-civeng";
import p_mc_climsci from "./v4PanelC/mc-climsci";
import p_mc_clind from "./v4PanelC/mc-clind";
import p_mc_clined from "./v4PanelC/mc-clined";
import p_mc_clinrhb from "./v4PanelC/mc-clinrhb";
import p_mc_cm from "./v4PanelC/mc-cm";
import p_mc_cmprop from "./v4PanelC/mc-cmprop";
import p_mc_cncrsc from "./v4PanelC/mc-cncrsc";
import p_mc_comact from "./v4PanelC/mc-comact";
import p_mc_comacts from "./v4PanelC/mc-comacts";
import p_mc_comdrfs from "./v4PanelC/mc-comdrfs";
import p_mc_comeco from "./v4PanelC/mc-comeco";
import p_mc_comfin from "./v4PanelC/mc-comfin";
import p_mc_commgmt from "./v4PanelC/mc-commgmt";
import p_mc_commktg from "./v4PanelC/mc-commktg";
import p_mc_contcs from "./v4PanelC/mc-contcs";
import p_mc_counsmo from "./v4PanelC/mc-counsmo";
import p_mc_cs from "./v4PanelC/mc-cs";
import p_mc_ctpyart from "./v4PanelC/mc-ctpyart";
import p_mc_cu from "./v4PanelC/mc-cu";
import p_mc_culmc from "./v4PanelC/mc-culmc";
import p_mc_cybscmo from "./v4PanelC/mc-cybscmo";
import p_mc_datasc from "./v4PanelC/mc-datasc";
import p_mc_ddensur from "./v4PanelC/mc-ddensur";
import p_mc_desprod from "./v4PanelC/mc-desprod";
import p_mc_dinfeng from "./v4PanelC/mc-dinfeng";
import p_mc_dmed from "./v4PanelC/mc-dmed";
import p_mc_dmktg from "./v4PanelC/mc-dmktg";
import p_mc_dnce from "./v4PanelC/mc-dnce";
import p_mc_doptom from "./v4PanelC/mc-doptom";
import p_mc_dphysio from "./v4PanelC/mc-dphysio";
import p_mc_dvetmed from "./v4PanelC/mc-dvetmed";
import p_mc_eco from "./v4PanelC/mc-eco";
import p_mc_ecosmc from "./v4PanelC/mc-ecosmc";
import p_mc_ed from "./v4PanelC/mc-ed";
import p_mc_edebt from "./v4PanelC/mc-edebt";
import p_mc_eleceng from "./v4PanelC/mc-eleceng";
import p_mc_engysys from "./v4PanelC/mc-engysys";
import p_mc_enrslaw from "./v4PanelC/mc-enrslaw";
import p_mc_ensysen from "./v4PanelC/mc-ensysen";
import p_mc_entrpsp from "./v4PanelC/mc-entrpsp";
import p_mc_env from "./v4PanelC/mc-env";
import p_mc_enveng from "./v4PanelC/mc-enveng";
import p_mc_envlaw from "./v4PanelC/mc-envlaw";
import p_mc_envsc from "./v4PanelC/mc-envsc";
import p_mc_evalo from "./v4PanelC/mc-evalo";
import p_mc_filmtv from "./v4PanelC/mc-filmtv";
import p_mc_finance from "./v4PanelC/mc-finance";
import p_mc_finenh from "./v4PanelC/mc-finenh";
import p_mc_foodpi from "./v4PanelC/mc-foodpi";
import p_mc_gcclaw from "./v4PanelC/mc-gcclaw";
import p_mc_gencoun from "./v4PanelC/mc-gencoun";
import p_mc_genohlt from "./v4PanelC/mc-genohlt";
import p_mc_geog from "./v4PanelC/mc-geog";
import p_mc_geosc from "./v4PanelC/mc-geosc";
import p_mc_gmcom from "./v4PanelC/mc-gmcom";
import p_mc_hrmmo from "./v4PanelC/mc-hrmmo";
import p_mc_humrlaw from "./v4PanelC/mc-humrlaw";
import p_mc_ib from "./v4PanelC/mc-ib";
import p_mc_ibl from "./v4PanelC/mc-ibl";
import p_mc_indeng from "./v4PanelC/mc-indeng";
import p_mc_inslead from "./v4PanelC/mc-inslead";
import p_mc_intedib from "./v4PanelC/mc-intedib";
import p_mc_intjour from "./v4PanelC/mc-intjour";
import p_mc_ir from "./v4PanelC/mc-ir";
import p_mc_is from "./v4PanelC/mc-is";
import p_mc_it from "./v4PanelC/mc-it";
import p_mc_journ from "./v4PanelC/mc-journ";
import p_mc_jurisd from "./v4PanelC/mc-jurisd";
import p_mc_larch from "./v4PanelC/mc-larch";
import p_mc_larchud from "./v4PanelC/mc-larchud";
import p_mc_larchup from "./v4PanelC/mc-larchup";
import p_mc_li from "./v4PanelC/mc-li";
import p_mc_mecheng from "./v4PanelC/mc-mecheng";
import p_mc_mgmt from "./v4PanelC/mc-mgmt";
import p_mc_mgmtact from "./v4PanelC/mc-mgmtact";
import p_mc_mgmtafn from "./v4PanelC/mc-mgmtafn";
import p_mc_mgmtein from "./v4PanelC/mc-mgmtein";
import p_mc_mgmtfin from "./v4PanelC/mc-mgmtfin";
import p_mc_mgmthre from "./v4PanelC/mc-mgmthre";
import p_mc_mgmtmkt from "./v4PanelC/mc-mgmtmkt";
import p_mc_mgmtscm from "./v4PanelC/mc-mgmtscm";
import p_mc_mktcomm from "./v4PanelC/mc-mktcomm";
import p_mc_mled from "./v4PanelC/mc-mled";
import p_mc_mti from "./v4PanelC/mc-mti";
import p_mc_mtrneng from "./v4PanelC/mc-mtrneng";
import p_mc_musop from "./v4PanelC/mc-musop";
import p_mc_musorp from "./v4PanelC/mc-musorp";
import p_mc_muspt from "./v4PanelC/mc-muspt";
import p_mc_ntcw from "./v4PanelC/mc-ntcw";
import p_mc_nursc from "./v4PanelC/mc-nursc";
import p_mc_phtypae from "./v4PanelC/mc-phtypae";
import p_mc_phtyph from "./v4PanelC/mc-phtyph";
import p_mc_privlaw from "./v4PanelC/mc-privlaw";
import p_mc_prop from "./v4PanelC/mc-prop";
import p_mc_propsyc from "./v4PanelC/mc-propsyc";
import p_mc_propup from "./v4PanelC/mc-propup";
import p_mc_psyched from "./v4PanelC/mc-psyched";
import p_mc_pubcom from "./v4PanelC/mc-pubcom";
import p_mc_scibif from "./v4PanelC/mc-scibif";
import p_mc_scibio from "./v4PanelC/mc-scibio";
import p_mc_scibit from "./v4PanelC/mc-scibit";
import p_mc_sciche from "./v4PanelC/mc-sciche";
import p_mc_sciear from "./v4PanelC/mc-sciear";
import p_mc_sciepi from "./v4PanelC/mc-sciepi";
import p_mc_scimat from "./v4PanelC/mc-scimat";
import p_mc_sciphy from "./v4PanelC/mc-sciphy";
import p_mc_scl from "./v4PanelC/mc-scl";
import p_mc_scwr from "./v4PanelC/mc-scwr";
import p_mc_socw from "./v4PanelC/mc-socw";
import p_mc_softeng from "./v4PanelC/mc-softeng";
import p_mc_spchpth from "./v4PanelC/mc-spchpth";
import p_mc_spmed from "./v4PanelC/mc-spmed";
import p_mc_surged from "./v4PanelC/mc-surged";
import p_mc_tchecp from "./v4PanelC/mc-tchecp";
import p_mc_teachec from "./v4PanelC/mc-teachec";
import p_mc_teachpr from "./v4PanelC/mc-teachpr";
import p_mc_teachsa from "./v4PanelC/mc-teachsa";
import p_mc_teachsi from "./v4PanelC/mc-teachsi";
import p_mc_tesol from "./v4PanelC/mc-tesol";
import p_mc_thtr from "./v4PanelC/mc-thtr";
import p_mc_thtrdir from "./v4PanelC/mc-thtrdir";
import p_mc_thtrdra from "./v4PanelC/mc-thtrdra";
import p_mc_thtrwri from "./v4PanelC/mc-thtrwri";
import p_mc_tranint from "./v4PanelC/mc-tranint";
import p_mc_uch from "./v4PanelC/mc-uch";
import p_mc_upud from "./v4PanelC/mc-upud";
import p_mc_urbdes from "./v4PanelC/mc-urbdes";
import p_mc_urbhort from "./v4PanelC/mc-urbhort";
import p_mc_urpl from "./v4PanelC/mc-urpl";
import p_mc_vetstdr from "./v4PanelC/mc-vetstdr";
import p_mc_ymhmo from "./v4PanelC/mc-ymhmo";
import p_me_dcd from "./v4PanelC/me-dcd";
import p_n01aa from "./v4PanelC/n01aa";

export const V4_PANEL_C: Record<string, V4PanelC> = {
  "038ab": p_038ab,
  "080cl": p_080cl,
  "080cn": p_080cn,
  "097ab": p_097ab,
  "175aa": p_175aa,
  "192aa": p_192aa,
  "195aa": p_195aa,
  "244cw": p_244cw,
  "274ab": p_274ab,
  "277aa": p_277aa,
  "294be": p_294be,
  "300bb": p_300bb,
  "305bb": p_305bb,
  "342aa": p_342aa,
  "344ab": p_344ab,
  "439fs": p_439fs,
  "502cw": p_502cw,
  "504aa": p_504aa,
  "507aa": p_507aa,
  "510aa": p_510aa,
  "511aa": p_511aa,
  "526aa": p_526aa,
  "527cl": p_527cl,
  "527cn": p_527cn,
  "635aa": p_635aa,
  "706aa": p_706aa,
  "742ab": p_742ab,
  "746st": p_746st,
  "761em": p_761em,
  "841ac": p_841ac,
  "872bb": p_872bb,
  "991aa": p_991aa,
  "b-agr": p_b_agr,
  "b-arts": p_b_arts,
  "b-bmed": p_b_bmed,
  "b-com": p_b_com,
  "b-des": p_b_des,
  "b-faacting": p_b_faacting,
  "b-faanim": p_b_faanim,
  "b-fadance": p_b_fadance,
  "b-fafilmtv": p_b_fafilmtv,
  "b-famusth": p_b_famusth,
  "b-fapro": p_b_fapro,
  "b-fascwri": p_b_fascwri,
  "b-fath": p_b_fath,
  "b-favisart": p_b_favisart,
  "b-mus": p_b_mus,
  "b-sci": p_b_sci,
  "b-sciextd": p_b_sciextd,
  "d01lf": p_d01lf,
  "dr-philedp": p_dr_philedp,
  "j17re": p_j17re,
  "m04aa": p_m04aa,
  "mc-actsc": p_mc_actsc,
  "mc-actscen": p_mc_actscen,
  "mc-actscex": p_mc_actscex,
  "mc-adolhw": p_mc_adolhw,
  "mc-advnpph": p_mc_advnpph,
  "mc-aecoenh": p_mc_aecoenh,
  "mc-aemtrcs": p_mc_aemtrcs,
  "mc-agsc": p_mc_agsc,
  "mc-aimo": p_mc_aimo,
  "mc-anamgt": p_mc_anamgt,
  "mc-anp": p_mc_anp,
  "mc-anpnp": p_mc_anpnp,
  "mc-ap": p_mc_ap,
  "mc-apbusa": p_mc_apbusa,
  "mc-apling": p_mc_apling,
  "mc-app": p_mc_app,
  "mc-arch": p_mc_arch,
  "mc-archcm": p_mc_archcm,
  "mc-archeng": p_mc_archeng,
  "mc-archuch": p_mc_archuch,
  "mc-archud": p_mc_archud,
  "mc-archup": p_mc_archup,
  "mc-arclarc": p_mc_arclarc,
  "mc-arcprop": p_mc_arcprop,
  "mc-ba": p_mc_ba,
  "mc-bamktg": p_mc_bamktg,
  "mc-base": p_mc_base,
  "mc-biomeng": p_mc_biomeng,
  "mc-biosenh": p_mc_biosenh,
  "mc-bmedsc": p_mc_bmedsc,
  "mc-bus": p_mc_bus,
  "mc-busana": p_mc_busana,
  "mc-cat": p_mc_cat,
  "mc-chemeng": p_mc_chemeng,
  "mc-civeng": p_mc_civeng,
  "mc-climsci": p_mc_climsci,
  "mc-clind": p_mc_clind,
  "mc-clined": p_mc_clined,
  "mc-clinrhb": p_mc_clinrhb,
  "mc-cm": p_mc_cm,
  "mc-cmprop": p_mc_cmprop,
  "mc-cncrsc": p_mc_cncrsc,
  "mc-comact": p_mc_comact,
  "mc-comacts": p_mc_comacts,
  "mc-comdrfs": p_mc_comdrfs,
  "mc-comeco": p_mc_comeco,
  "mc-comfin": p_mc_comfin,
  "mc-commgmt": p_mc_commgmt,
  "mc-commktg": p_mc_commktg,
  "mc-contcs": p_mc_contcs,
  "mc-counsmo": p_mc_counsmo,
  "mc-cs": p_mc_cs,
  "mc-ctpyart": p_mc_ctpyart,
  "mc-cu": p_mc_cu,
  "mc-culmc": p_mc_culmc,
  "mc-cybscmo": p_mc_cybscmo,
  "mc-datasc": p_mc_datasc,
  "mc-ddensur": p_mc_ddensur,
  "mc-desprod": p_mc_desprod,
  "mc-dinfeng": p_mc_dinfeng,
  "mc-dmed": p_mc_dmed,
  "mc-dmktg": p_mc_dmktg,
  "mc-dnce": p_mc_dnce,
  "mc-doptom": p_mc_doptom,
  "mc-dphysio": p_mc_dphysio,
  "mc-dvetmed": p_mc_dvetmed,
  "mc-eco": p_mc_eco,
  "mc-ecosmc": p_mc_ecosmc,
  "mc-ed": p_mc_ed,
  "mc-edebt": p_mc_edebt,
  "mc-eleceng": p_mc_eleceng,
  "mc-engysys": p_mc_engysys,
  "mc-enrslaw": p_mc_enrslaw,
  "mc-ensysen": p_mc_ensysen,
  "mc-entrpsp": p_mc_entrpsp,
  "mc-env": p_mc_env,
  "mc-enveng": p_mc_enveng,
  "mc-envlaw": p_mc_envlaw,
  "mc-envsc": p_mc_envsc,
  "mc-evalo": p_mc_evalo,
  "mc-filmtv": p_mc_filmtv,
  "mc-finance": p_mc_finance,
  "mc-finenh": p_mc_finenh,
  "mc-foodpi": p_mc_foodpi,
  "mc-gcclaw": p_mc_gcclaw,
  "mc-gencoun": p_mc_gencoun,
  "mc-genohlt": p_mc_genohlt,
  "mc-geog": p_mc_geog,
  "mc-geosc": p_mc_geosc,
  "mc-gmcom": p_mc_gmcom,
  "mc-hrmmo": p_mc_hrmmo,
  "mc-humrlaw": p_mc_humrlaw,
  "mc-ib": p_mc_ib,
  "mc-ibl": p_mc_ibl,
  "mc-indeng": p_mc_indeng,
  "mc-inslead": p_mc_inslead,
  "mc-intedib": p_mc_intedib,
  "mc-intjour": p_mc_intjour,
  "mc-ir": p_mc_ir,
  "mc-is": p_mc_is,
  "mc-it": p_mc_it,
  "mc-journ": p_mc_journ,
  "mc-jurisd": p_mc_jurisd,
  "mc-larch": p_mc_larch,
  "mc-larchud": p_mc_larchud,
  "mc-larchup": p_mc_larchup,
  "mc-li": p_mc_li,
  "mc-mecheng": p_mc_mecheng,
  "mc-mgmt": p_mc_mgmt,
  "mc-mgmtact": p_mc_mgmtact,
  "mc-mgmtafn": p_mc_mgmtafn,
  "mc-mgmtein": p_mc_mgmtein,
  "mc-mgmtfin": p_mc_mgmtfin,
  "mc-mgmthre": p_mc_mgmthre,
  "mc-mgmtmkt": p_mc_mgmtmkt,
  "mc-mgmtscm": p_mc_mgmtscm,
  "mc-mktcomm": p_mc_mktcomm,
  "mc-mled": p_mc_mled,
  "mc-mti": p_mc_mti,
  "mc-mtrneng": p_mc_mtrneng,
  "mc-musop": p_mc_musop,
  "mc-musorp": p_mc_musorp,
  "mc-muspt": p_mc_muspt,
  "mc-ntcw": p_mc_ntcw,
  "mc-nursc": p_mc_nursc,
  "mc-phtypae": p_mc_phtypae,
  "mc-phtyph": p_mc_phtyph,
  "mc-privlaw": p_mc_privlaw,
  "mc-prop": p_mc_prop,
  "mc-propsyc": p_mc_propsyc,
  "mc-propup": p_mc_propup,
  "mc-psyched": p_mc_psyched,
  "mc-pubcom": p_mc_pubcom,
  "mc-scibif": p_mc_scibif,
  "mc-scibio": p_mc_scibio,
  "mc-scibit": p_mc_scibit,
  "mc-sciche": p_mc_sciche,
  "mc-sciear": p_mc_sciear,
  "mc-sciepi": p_mc_sciepi,
  "mc-scimat": p_mc_scimat,
  "mc-sciphy": p_mc_sciphy,
  "mc-scl": p_mc_scl,
  "mc-scwr": p_mc_scwr,
  "mc-socw": p_mc_socw,
  "mc-softeng": p_mc_softeng,
  "mc-spchpth": p_mc_spchpth,
  "mc-spmed": p_mc_spmed,
  "mc-surged": p_mc_surged,
  "mc-tchecp": p_mc_tchecp,
  "mc-teachec": p_mc_teachec,
  "mc-teachpr": p_mc_teachpr,
  "mc-teachsa": p_mc_teachsa,
  "mc-teachsi": p_mc_teachsi,
  "mc-tesol": p_mc_tesol,
  "mc-thtr": p_mc_thtr,
  "mc-thtrdir": p_mc_thtrdir,
  "mc-thtrdra": p_mc_thtrdra,
  "mc-thtrwri": p_mc_thtrwri,
  "mc-tranint": p_mc_tranint,
  "mc-uch": p_mc_uch,
  "mc-upud": p_mc_upud,
  "mc-urbdes": p_mc_urbdes,
  "mc-urbhort": p_mc_urbhort,
  "mc-urpl": p_mc_urpl,
  "mc-vetstdr": p_mc_vetstdr,
  "mc-ymhmo": p_mc_ymhmo,
  "me-dcd": p_me_dcd,
  "n01aa": p_n01aa,
};

export const v4PanelCByCode = (code: string): V4PanelC | undefined =>
  V4_PANEL_C[code.toLowerCase()];
